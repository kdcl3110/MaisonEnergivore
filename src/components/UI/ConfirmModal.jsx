import React from 'react';
import { ExclamationCircleOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const ConfirmModal = ({ isOpen, onConfirm, onCancel, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onCancel}></div>

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-orange-500 shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="p-4 sm:p-5 text-center border-b-2 border-orange-500/50 bg-gradient-to-r from-orange-900/50 to-red-900/50">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ExclamationCircleOutlined className="text-3xl sm:text-4xl text-orange-400" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            {title || 'Confirmation'}
          </h2>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <p className="text-sm sm:text-base text-gray-300 text-center leading-relaxed">
            {message || 'Êtes-vous sûr de vouloir continuer ?'}
          </p>
        </div>

        {/* Actions */}
        <div className="p-3 sm:p-4 border-t-2 border-orange-500/20 bg-gray-900/50 flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-bold text-sm transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
            <CloseOutlined style={{ fontSize: '14px' }} />
            Non, rester
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-sm transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
            <CheckOutlined style={{ fontSize: '14px' }} />
            Oui, quitter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
