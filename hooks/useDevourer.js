
import { useState, useCallback, useRef } from 'react';

export 

export const useDevourer = (initialState: DevourerState = 'IDLE') => {
  const [status, setStatus] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const lastState = useRef(initialState);

  const transition = useCallback((newState, processing = false) => {
    lastState.current = status;
    setStatus(newState);
    setIsProcessing(processing);
  }, [status]);

  const revert = useCallback(() => {
    setStatus(lastState.current);
    setIsProcessing(false);
  }, []);

  return { 
    status, 
    isProcessing, 
    transition,
    revert
  };
};