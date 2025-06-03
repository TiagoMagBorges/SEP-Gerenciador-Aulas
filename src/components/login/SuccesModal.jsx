import React from 'react';

export default function SuccessModal({ message, onClose, onRedirect }) {
  if (!message) return null;

  const handleConfirm = () => {
    onClose();
    onRedirect();
  };

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 md:p-8 rounded-[15px] md:rounded-[20px] shadow-xl w-full max-w-md mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">Sucesso!</h2>
          <p className="text-gray-700 mb-6 text-center">{message}</p>
          <button
              onClick={handleConfirm}
              className="btn-primary w-full h-12"
          >
            <h1 className="text-[18px] md:text-[20px] font-semibold">Fazer Login</h1>
          </button>
        </div>
      </div>
  );
}