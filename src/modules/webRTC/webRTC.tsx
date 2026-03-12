import { useState, useRef, useCallback } from 'react';
import { CONNECTION_STATE } from './types';

const signaling_url = 'ws://localhost:8080';

const WebRTCStreamer = () => {
    const [connectionState, setConnectionState] = useState(CONNECTION_STATE.DISCONNECTED);
    const [dataChannelState, setDataChannelState] = useState('closed');
    const [messageInput, setMessageInput] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [streamStats, setStreamStats] = useState({
        bytesSent: 0,
        bytesReceived: 0,
        messageSent: 0,
        messagesReceived: 0
    });
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const dataChannelRef = useRef<RTCDataChannel | null>(null);
    const webSocketRef = useRef<WebSocket | null>(null);
    const statsRef = useRef(streamStats);


    const connectSignalingServer = useCallback(() => {
        return new Promise((resolve, reject) => {
            const ws = new WebSocket(signaling_url);
            webSocketRef.current = ws;

            ws.onopen = () => {
                resolve(ws);
            }

            ws.onerror = (error) => {
                reject(error);
            }

            ws.onmessage = async event => {
                const message = JSON.parse(event.data);
                await handleSignalingMessage(message)
            }
        })
    }, []);

    const handleSignalingMessage = useCallback(async (message) => {
        const pc = peerConnectionRef.current;
        if (!pc) return;

        switch (message.type) {
            
        }
    }, []);
    
}


export default WebRTCStreamer;