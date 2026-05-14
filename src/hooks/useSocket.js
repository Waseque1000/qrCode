import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export const useSocket = () => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Determine the socket URL dynamically to support mobile devices on the same network
    const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || `http://${host}:3001`;
    
    socketRef.current = io(socketUrl);

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to socket server');
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from socket server');
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const emit = (event, data) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  };

  const on = (event, callback) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
  };

  const off = (event) => {
    if (socketRef.current) {
      socketRef.current.off(event);
    }
  };

  return { isConnected, emit, on, off, socket: socketRef.current };
};
