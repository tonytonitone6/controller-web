import { useRef, useState, useCallback } from 'react';
import { StreamStats } from '../types';
import { DATA_CHANNEL_OPTIONS } from '../constants';

export const useDataChannel = () => {
  const [channelState, setChannelState] = useState<RTCDataChannelState>('closed');
  const [messages, setMessages] = useState<string[]>([]);
  const [stats, setStats] = useState<StreamStats>({
    bytesSent: 0,
    bytesReceived: 0,
    messagesSent: 0,
    messagesReceived: 0,
  });

  const channelRef = useRef<RTCDataChannel | null>(null);
  const statsRef = useRef<StreamStats>(stats);

  const updateStats = (patch: Partial<StreamStats>) => {
    const next = { ...statsRef.current, ...patch };
    statsRef.current = next;
    setStats(next);
  };

  // 共用的事件綁定，offerer 和 answerer 都走這裡
  const wire = useCallback((channel: RTCDataChannel) => {
    channelRef.current = channel;

    channel.onopen = () => setChannelState('open');
    channel.onclose = () => setChannelState('closed');
    channel.onerror = () => setChannelState('closing');

    channel.onmessage = ({ data }) => {
      const text = typeof data === 'string' ? data : '[binary]';
      const size = typeof data === 'string' ? new Blob([data]).size : (data as ArrayBuffer).byteLength;
      updateStats({
        bytesReceived: statsRef.current.bytesReceived + size,
        messagesReceived: statsRef.current.messagesReceived + 1,
      });
      setMessages((prev) => [...prev, text]);
    };
  }, []);

  // offerer 主動建立 channel
  const setup = useCallback((pc: RTCPeerConnection, channelName = 'data') => {
    const channel = pc.createDataChannel(channelName, DATA_CHANNEL_OPTIONS);
    wire(channel);
    return channel;
  }, [wire]);

  // answerer 透過 ondatachannel 接收 channel
  const attach = useCallback((channel: RTCDataChannel) => {
    wire(channel);
    // channel 可能在 wire 之前就已 open
    if (channel.readyState === 'open') setChannelState('open');
  }, [wire]);

  const send = useCallback((data: string) => {
    const ch = channelRef.current;
    if (ch?.readyState !== 'open') {
      console.warn('[DataChannel] Cannot send — channel not open');
      return;
    }
    ch.send(data);
    updateStats({
      bytesSent: statsRef.current.bytesSent + new Blob([data]).size,
      messagesSent: statsRef.current.messagesSent + 1,
    });
  }, []);

  const close = useCallback(() => {
    channelRef.current?.close();
    channelRef.current = null;
  }, []);

  const clearMessages = useCallback(() => setMessages([]), []);

  return { channelRef, channelState, messages, stats, setup, attach, send, close, clearMessages };
};
