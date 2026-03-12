import { useRef, useState, useCallback, useEffect } from 'react';
import { CONNECTION_STATE } from '../types';
import { ICE_SERVERS } from '../constants';

interface UsePeerConnectionOptions {
  onIceCandidate?: (candidate: RTCIceCandidate) => void;
}

export const usePeerConnection = ({
  onIceCandidate,
}: UsePeerConnectionOptions = {}) => {
  const [connectionState, setConnectionState] = useState<CONNECTION_STATE>(
    CONNECTION_STATE.DISCONNECTED,
  );
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const candidateQueue = useRef<RTCIceCandidateInit[]>([]);
  const onIceCandidateRef = useRef(onIceCandidate);
  onIceCandidateRef.current = onIceCandidate;

  const create = useCallback(() => {
    candidateQueue.current = [];
    const pc = new RTCPeerConnection(ICE_SERVERS);
    pcRef.current = pc;

    pc.onicecandidate = ({ candidate }) => {
      if (candidate) onIceCandidateRef.current?.(candidate);
    };

    pc.onconnectionstatechange = () => {
      switch (pc.connectionState) {
        case 'connecting':
          setConnectionState(CONNECTION_STATE.CONNECTING);
          break;
        case 'connected':
          setConnectionState(CONNECTION_STATE.CONNECTED);
          break;
        case 'disconnected':
        case 'closed':
          setConnectionState(CONNECTION_STATE.DISCONNECTED);
          break;
        case 'failed':
          setConnectionState(CONNECTION_STATE.FAILED);
          break;
      }
    };

    return pc;
  }, []);

  const createOffer = useCallback(async () => {
    const pc = pcRef.current;
    if (!pc) throw new Error('PeerConnection not initialized');
    const offer = await pc.createOffer({ offerToReceiveAudio: false, offerToReceiveVideo: false });
    await pc.setLocalDescription(offer);
    return offer;
  }, []);

  // answerer：收到 offer → set remote → drain queue → create answer
  const handleOffer = useCallback(async (sdp: string) => {
    const pc = pcRef.current;
    if (!pc) throw new Error('PeerConnection not initialized');
    await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp }));
    for (const c of candidateQueue.current) {
      await pc.addIceCandidate(new RTCIceCandidate(c));
    }
    candidateQueue.current = [];
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    return answer;
  }, []);

  // offerer：收到 answer → set remote → drain queue
  const handleAnswer = useCallback(async (sdp: string) => {
    const pc = pcRef.current;
    if (!pc) return;
    await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp }));
    for (const c of candidateQueue.current) {
      await pc.addIceCandidate(new RTCIceCandidate(c));
    }
    candidateQueue.current = [];
  }, []);

  const addIceCandidate = useCallback(async (candidate: RTCIceCandidateInit) => {
    const pc = pcRef.current;
    if (!pc) return;
    if (!pc.remoteDescription) {
      candidateQueue.current.push(candidate);
      return;
    }
    await pc.addIceCandidate(new RTCIceCandidate(candidate));
  }, []);

  const close = useCallback(() => {
    pcRef.current?.close();
    pcRef.current = null;
    candidateQueue.current = [];
    setConnectionState(CONNECTION_STATE.DISCONNECTED);
  }, []);

  useEffect(() => () => close(), [close]);

  return { pcRef, connectionState, create, createOffer, handleOffer, handleAnswer, addIceCandidate, close };
};
