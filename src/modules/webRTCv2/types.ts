export enum CONNECTION_STATE {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  FAILED = 'failed',
}

export enum SIGNALING_STATE {
  CLOSED = 'closed',
  CONNECTING = 'connecting',
  OPEN = 'open',
  ERROR = 'error',
}

export interface SignalingMessage {
  type:
    | 'offer'
    | 'answer'
    | 'ice-candidate'
    | 'new-peer'   // server -> existing peers: someone joined
    | 'peers'      // server -> new peer: list of existing peer IDs
    | 'peer-left'  // server -> remaining peers: someone disconnected
    | 'error';

  from?: string;           // stamped by server on forwarded messages
  to?: string;             // required on offer/answer/ice-candidate
  sdp?: string;
  candidate?: RTCIceCandidateInit;
  peerId?: string;         // used in new-peer / peer-left
  peers?: string[];        // used in peers message
  error?: string;
}

export interface StreamStats {
  bytesSent: number;
  bytesReceived: number;
  messagesSent: number;
  messagesReceived: number;
}
