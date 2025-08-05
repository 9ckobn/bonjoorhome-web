"use client";

import React from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error" | "warning";
  title: string;
  message: string;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-12 h-12 text-green-500" />;
      case "error":
        return <XCircle className="w-12 h-12 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-12 h-12 text-yellow-500" />;
      default:
        return <CheckCircle className="w-12 h-12 text-blue-500" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case "success":
        return {
          iconBg: "bg-green-50",
          button: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500", // Use blue for consistency
        };
      case "error":
        return {
          iconBg: "bg-red-50",
          button: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500", // Use blue for consistency
        };
      case "warning":
        return {
          iconBg: "bg-yellow-50",
          button: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500", // Use blue for consistency
        };
      default:
        return {
          iconBg: "bg-blue-50",
          button: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
        };
    }
  };

  const colors = getColors();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-full ${colors.iconBg}`}>
              {getIcon()}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className={`px-6 py-2 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${colors.button}`}
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
