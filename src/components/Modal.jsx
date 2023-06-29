import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Modal.css';

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className='modal-close-button' onClick={onClose}>
          X
        </button>
        {children}
        <button className='modal-exit-button' onClick={onClose}>
          Sair
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
