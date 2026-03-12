import { useRef, useState, useCallback, useEffect } from 'react';
import { SIGNALING_STATE, SignalingMessage } from '../types';

interface UseSignalingOptions {
  url: string;
  onMessage: (msg: SignalingMessage) => void;
}

export const useSignaling = ({ url, onMessage }: UseSignalingOptions) => {
  const [state, setState] = useState<SIGNALING_STATE>(SIGNALING_STATE.CLOSED);
  const wsRef = useRef<WebSocket | null>(null);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  const connect = useCallback((): Promise<WebSocket> => {
    return new Promise((resolve, reject) => {
      setState(SIGNALING_STATE.CONNECTING);
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        setState(SIGNALING_STATE.OPEN);
        resolve(ws);
      };

      ws.onerror = (err) => {
        setState(SIGNALING_STATE.ERROR);
        reject(err);
      };

      ws.onclose = () => {
        setState(SIGNALING_STATE.CLOSED);
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data) as SignalingMessage;
          onMessageRef.current(msg);
        } catch (e) {
          console.error('[Signaling] Failed to parse message', e);
        }
      };
    });
  }, [url]);

  const send = useCallback((msg: SignalingMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      console.warn('[Signaling] Cannot send — WS not open');
    }
  }, []);

  const disconnect = useCallback(() => {
    wsRef.current?.close();
    wsRef.current = null;
  }, []);

  useEffect(() => () => disconnect(), [disconnect]);

  return { state, connect, send, disconnect };
};
