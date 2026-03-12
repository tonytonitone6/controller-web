import { useState, useCallback, useRef } from 'react';
import { SIGNALING_URL } from './constants';
import { SignalingMessage, CONNECTION_STATE, SIGNALING_STATE } from './types';
import { useSignaling } from './hooks/useSignaling';
import { usePeerConnection } from './hooks/usePeerConnection';
import { useDataChannel } from './hooks/useDataChannel';

const WebRTCStreamerV2 = () => {
  const [messageInput, setMessageInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Refs to break circular deps and always hold latest functions
  const sigSendRef = useRef<((msg: SignalingMessage) => void) | null>(null);
  const startOfferRef = useRef<((targetPeerId: string) => Promise<void>) | null>(null);
  // Track which peer we're currently connected to (for routing ICE candidates)
  const remotePeerIdRef = useRef<string | null>(null);

  /* ── Data Channel ── */
  const { channelState, messages, stats, setup, attach, send, close: closeChannel, clearMessages } =
    useDataChannel();

  /* ── Peer Connection ── */
  const { pcRef, connectionState, create, createOffer, handleOffer, handleAnswer, addIceCandidate, close: closePc } =
    usePeerConnection({
      onIceCandidate: (candidate) => {
        const to = remotePeerIdRef.current;
        if (to) sigSendRef.current?.({ type: 'ice-candidate', to, candidate: candidate.toJSON() });
      },
    });

  /* ── Signaling ── */
  const handleSignalingMessage = useCallback(
    async (msg: SignalingMessage) => {
      try {
        switch (msg.type) {
          case 'peers':
            // We just joined — wait for existing peers to send us an offer
            break;
          case 'new-peer': {
            // An existing peer receives this when someone new joins — we become offerer
            if (msg.peerId) await startOfferRef.current?.(msg.peerId);
            break;
          }
          case 'offer': {
            if (!msg.sdp || !msg.from) break;
            remotePeerIdRef.current = msg.from;
            const answer = await handleOffer(msg.sdp);
            sigSendRef.current?.({ type: 'answer', to: msg.from, sdp: answer.sdp });
            break;
          }
          case 'answer':
            if (msg.sdp) await handleAnswer(msg.sdp);
            break;
          case 'ice-candidate':
            if (msg.candidate) await addIceCandidate(msg.candidate);
            break;
          case 'peer-left':
            // Optional: handle peer disconnect
            break;
          case 'error':
            setError(msg.error ?? 'Signaling error');
            break;
        }
      } catch (e) {
        setError(String(e));
      }
    },
    [handleOffer, handleAnswer, addIceCandidate],
  );

  const {
    state: sigState,
    connect: sigConnect,
    send: sigSend,
    disconnect: sigDisconnect,
  } = useSignaling({ url: SIGNALING_URL, onMessage: handleSignalingMessage });

  sigSendRef.current = sigSend;

  /* ── Flow ── */
  const startOffer = useCallback(async (targetPeerId: string) => {
    const pc = pcRef.current;
    if (!pc) return;
    remotePeerIdRef.current = targetPeerId;
    setup(pc);
    const offer = await createOffer();
    sigSendRef.current?.({ type: 'offer', to: targetPeerId, sdp: offer.sdp });
  }, [pcRef, setup, createOffer]);

  startOfferRef.current = startOffer;

  const handleConnect = async () => {
    setError(null);
    clearMessages();
    try {
      const pc = create();
      // answerer role: data channel comes in via ondatachannel
      pc.ondatachannel = (e) => attach(e.channel);
      await sigConnect();
    } catch (e) {
      setError(`Connection failed: ${e}`);
    }
  };

  const handleDisconnect = () => {
    closeChannel();
    closePc();
    sigDisconnect();
    remotePeerIdRef.current = null;
  };

  const handleSend = () => {
    if (!messageInput.trim()) return;
    send(messageInput);
    setMessageInput('');
  };

  const isConnected = connectionState === CONNECTION_STATE.CONNECTED;
  const isConnecting =
    connectionState === CONNECTION_STATE.CONNECTING ||
    sigState === SIGNALING_STATE.CONNECTING;

  return (
    <div className="p-6 space-y-4 max-w-2xl mx-auto font-mono text-sm">
      <h2 className="text-lg font-semibold">WebRTC Streamer v2</h2>

      {/* Status */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <StatusBadge label="Signaling" value={sigState} />
        <StatusBadge label="Peer" value={connectionState} />
        <StatusBadge label="DataChannel" value={channelState} />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-xs">{error}</div>
      )}

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={handleConnect}
          disabled={isConnecting || isConnected}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-40"
        >
          {isConnecting ? 'Connecting…' : 'Connect'}
        </button>
        <button
          onClick={handleDisconnect}
          disabled={!isConnected && !isConnecting}
          className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-40"
        >
          Disconnect
        </button>
      </div>

      {/* Message input */}
      <div className="flex gap-2">
        <input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message…"
          disabled={channelState !== 'open'}
          className="flex-1 border rounded px-3 py-2 disabled:opacity-40"
        />
        <button
          onClick={handleSend}
          disabled={channelState !== 'open'}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-40"
        >
          Send
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-1 text-xs text-gray-500">
        <span>Sent: {stats.messagesSent} msgs / {stats.bytesSent} B</span>
        <span>Received: {stats.messagesReceived} msgs / {stats.bytesReceived} B</span>
      </div>

      {/* Messages */}
      <div className="border rounded h-48 overflow-y-auto p-2 space-y-1 bg-gray-50">
        {messages.length === 0 && (
          <span className="text-gray-400 text-xs">No messages yet…</span>
        )}
        {messages.map((msg, i) => (
          <div key={i} className="text-xs text-gray-700 break-all">
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Helper ── */
const STATUS_COLORS: Record<string, string> = {
  connected: 'bg-green-100 text-green-700',
  open: 'bg-green-100 text-green-700',
  connecting: 'bg-yellow-100 text-yellow-700',
  disconnected: 'bg-gray-100 text-gray-500',
  closed: 'bg-gray-100 text-gray-500',
  failed: 'bg-red-100 text-red-600',
  error: 'bg-red-100 text-red-600',
};

const StatusBadge = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-start gap-0.5">
    <span className="text-gray-400">{label}</span>
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[value] ?? 'bg-gray-100'}`}>
      {value}
    </span>
  </div>
);

export default WebRTCStreamerV2;
