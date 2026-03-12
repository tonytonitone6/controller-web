// Signaling server 位置，room 參數用來配對兩個 peer
// 開發環境：bun --watch ../signaling-server/src/index.ts
export const SIGNALING_URL = 'ws://localhost:8080?room=default';

export const ICE_SERVERS: RTCConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ],
};

export const DATA_CHANNEL_OPTIONS: RTCDataChannelInit = {
  ordered: true,
};
