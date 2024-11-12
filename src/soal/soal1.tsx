import { useCallback, useRef, useState } from 'react';

type Position = {
  x: number;
  y: number;
};

const Soal1 = () => {
  // 1. Buat kotak dibawah menjadi elemen drag and drop tanpa menggunakan plugin
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback(() => {
    const onMouseMove = (event: MouseEvent) => {
      setPosition((prevPosition) => {
        const newX = prevPosition.x + event.movementX;
        const newY = prevPosition.y + event.movementY;

        const element = elementRef.current;
        if (element) {
          element.style.transform = `translate(${newX}px, ${newY}px)`;
        }

        return { x: newX, y: newY };
      });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [position, setPosition, elementRef]);

  return (
    <>
      <div
        ref={elementRef}
        onMouseDown={onMouseDown}
        style={{
          backgroundColor: '#fff',
          width: 40,
          height: 40,
          borderRadius: '8px',
        }}
      ></div>

      {/* Ekspektasi hasil */}
      <iframe
        title='soal1'
        src='/soal1.mp4'
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          border: '1px solid white',
        }}
      ></iframe>
    </>
  );
};

export default Soal1;
