import React from 'react';
import './PdfModal.css';

function PdfModal({ isOpen, onClose, pdfUrl }) {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button className='modal-close' onClick={onClose} aria-label='Close'>
          &times;
        </button>
        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=0`}
          title='Resume PDF'
          width='100%'
          height='100%'
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
}

export default PdfModal;
