import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

export const useSocket = (sessionId, isDashboard = false) => {
  const [isConnected, setIsConnected] = useState(false);
  const peerRef = useRef(null);
  const connRef = useRef(null);
  const [scans, setScans] = useState([]);
  const callbacks = useRef({});

  useEffect(() => {
    if (typeof window === 'undefined' || !sessionId) return;

    // Use sessionId as Peer ID for the dashboard
    const peer = isDashboard 
      ? new Peer(`qrsync-${sessionId}`) 
      : new Peer();

    peerRef.current = peer;

    peer.on('open', (id) => {
      console.log('Peer connected with ID:', id);
      setIsConnected(true);
      if (callbacks.current['connect']) callbacks.current['connect']();
    });

    if (isDashboard) {
      // Dashboard listens for connections
      peer.on('connection', (conn) => {
        console.log('Mobile connected to dashboard');
        connRef.current = conn;
        if (callbacks.current['device-connected']) callbacks.current['device-connected']();

        conn.on('data', (data) => {
          console.log('Data received from mobile:', data);
          if (data.type === 'scan-data') {
            if (callbacks.current['new-scan']) {
              callbacks.current['new-scan']({
                id: Date.now().toString(),
                data: data.data,
                type: data.scanType,
                timestamp: new Date().toISOString()
              });
            }
          }
        });
      });
    } else if (sessionId) {
      // Mobile connects to dashboard
      const conn = peer.connect(`qrsync-${sessionId}`);
      connRef.current = conn;

      conn.on('open', () => {
        console.log('Connected to dashboard peer');
        setIsConnected(true);
      });

      conn.on('error', (err) => {
        console.error('Connection error:', err);
      });
    }

    return () => {
      if (peerRef.current) peerRef.current.destroy();
    };
  }, [sessionId, isDashboard]);

  const emit = (event, data) => {
    if (connRef.current && connRef.current.open) {
      if (event === 'scan-data') {
        connRef.current.send({ 
          type: 'scan-data', 
          data: data.data, 
          scanType: data.type 
        });
      } else if (event === 'create-session' || event === 'join-session') {
        // Handled by PeerJS connection logic
      }
    } else if (!isDashboard && sessionId) {
        // Retry connection if needed
        const conn = peerRef.current?.connect(`qrsync-${sessionId}`);
        if (conn) {
            connRef.current = conn;
            conn.on('open', () => conn.send({ 
                type: 'scan-data', 
                data: data.data, 
                scanType: data.type 
            }));
        }
    }
  };

  const on = (event, callback) => {
    callbacks.current[event] = callback;
  };

  return { isConnected, emit, on };
};
