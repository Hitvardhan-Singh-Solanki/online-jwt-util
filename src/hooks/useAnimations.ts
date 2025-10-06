import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function useFadeIn(dependency: unknown = null) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [dependency]);

  return ref;
}

export function usePulseScale() {
  const pulse = (element: HTMLElement) => {
    gsap.fromTo(
      element,
      { scale: 1 },
      { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.inOut' }
    );
  };

  return pulse;
}

export function useSuccessFlash() {
  const flash = (element: HTMLElement) => {
    const tl = gsap.timeline();
    tl.to(element, {
      backgroundColor: '#10b981',
      duration: 0.2,
      ease: 'power2.out',
    }).to(element, {
      backgroundColor: '',
      duration: 0.3,
      ease: 'power2.in',
    });
  };

  return flash;
}
