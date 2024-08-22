// umm ok

import React, { useRef, useEffect } from 'react';


const Modal = ({ isVisible, onClose, content }) => {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white p-6 rounded shadow-lg  w-90">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>

        <div dangerouslySetInnerHTML={{ __html: content }} />

        <button
          className="mt-4 float-right bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default Modal;