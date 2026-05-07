'use client';

import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    
    if (!cursor || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      
      const target = e.target as HTMLElement;
      if (
        target.closest('a') || 
        target.closest('button') || 
        target.closest('input') || 
        target.closest('select') || 
        target.closest('textarea') || 
        target.closest('.hoverable')
      ) {
        cursor.classList.add('is-hover');
        ring.classList.add('is-hover');
        isHovering = true;
      } else {
        cursor.classList.remove('is-hover');
        ring.classList.remove('is-hover');
        isHovering = false;
      }

      if (target.closest('input') || target.closest('textarea')) {
        cursor.classList.add('is-text');
        ring.classList.add('is-text');
      } else {
        cursor.classList.remove('is-text');
        ring.classList.remove('is-text');
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <div id="cursor" className="cursor" aria-hidden="true"></div>
      <div id="cursor-ring" className="cursor--ring" aria-hidden="true"></div>
    </>
  );
}
