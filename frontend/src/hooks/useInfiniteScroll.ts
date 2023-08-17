import { useEffect, useRef } from 'react';

export default function useInfiniteScroll(callback) {
  const observer = useRef();

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });

    const currentObserver = observer.current;

    return () => currentObserver.disconnect();
  }, [callback]);

  return [observer];
}
