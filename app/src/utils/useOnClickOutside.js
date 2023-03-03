import React, { useCallback, useEffect } from 'react';

export default function useOnClickOutside(ref, handler) {
  const handleClick = useCallback(
    (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        return handler(e);
      }

      return;
    },
    [handler, ref]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      return handler(e);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [handleClick]);
}
