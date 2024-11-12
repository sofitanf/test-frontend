import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Soal5 = () => {
  // 5. buatlah fungsi untuk menutup modal ketika tombol back browser diklik
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isBack, setIsBack] = useState<boolean>(false);

  useEffect(() => {
    // Function to handle the back button click
    const handlePopState = () => {
      setOpenModal(false);
      setIsBack(false);
    };

    if (openModal) {
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [openModal]);

  // Function to open the modal
  const openModalHandler = () => {
    setOpenModal((prev) => !prev);
    if (openModal && !isBack) {
      window.history.pushState(null, '', window.location.href);
      setIsBack(true);
    }
  };

  return (
    <>
      <div style={{ margin: '1rem' }}>
        {openModal && <Modal />}
        <button
          style={{ padding: '2px 4px', background: 'white' }}
          onClick={() => openModalHandler()}
        >
          {openModal ? 'close' : 'open'} modal
        </button>
      </div>

      {/* Ekspektasi hasil */}
      <iframe
        src='/soal5.mp4'
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

const Modal = () => {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) return <></>;
  return ReactDOM.createPortal(
    <section
      style={{
        background: '#8f9cb0',
        padding: '3rem',
        position: 'fixed',
        margin: '6rem',
      }}
    >
      <div>This is modal</div>
    </section>,
    modalRoot
  );
};

export default Soal5;
