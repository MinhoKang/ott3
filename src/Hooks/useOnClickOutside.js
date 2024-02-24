import React, { useEffect } from 'react';

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listner = (event) => {
      console.log(event.target);
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listner);
    document.addEventListener('touchstart', listner);
    return () => {
      document.addEventListener('mousedown', listner);
      document.addEventListener('touchstart', listner);
    };
  }, [ref, handler]);
}
