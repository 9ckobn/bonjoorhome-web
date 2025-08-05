"use client";

import { useState, useCallback } from "react";

interface Notification {
  type: "success" | "error" | "warning";
  title: string;
  message: string;
  onConfirm?: () => void; // Add callback function
}

export const useNotification = () => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const showSuccess = useCallback(
    (title: string, message: string, onConfirm?: () => void) => {
      setNotification({ type: "success", title, message, onConfirm });
      setIsOpen(true);
    },
    []
  );

  const showError = useCallback(
    (title: string, message: string, onConfirm?: () => void) => {
      setNotification({ type: "error", title, message, onConfirm });
      setIsOpen(true);
    },
    []
  );

  const showWarning = useCallback(
    (title: string, message: string, onConfirm?: () => void) => {
      setNotification({ type: "warning", title, message, onConfirm });
      setIsOpen(true);
    },
    []
  );

  const hideNotification = useCallback(() => {
    // Execute callback if provided
    if (notification?.onConfirm) {
      notification.onConfirm();
    }

    setIsOpen(false);
    // Clear notification after animation
    setTimeout(() => setNotification(null), 300);
  }, [notification]);

  return {
    notification,
    isOpen,
    showSuccess,
    showError,
    showWarning,
    hideNotification,
  };
};

// Convenience functions for quick usage
export const notify = {
  success: (title: string, message: string) => ({
    type: "success" as const,
    title,
    message,
  }),
  error: (title: string, message: string) => ({
    type: "error" as const,
    title,
    message,
  }),
  warning: (title: string, message: string) => ({
    type: "warning" as const,
    title,
    message,
  }),
};
