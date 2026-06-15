import { useEffect } from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center max-w-sm p-4 text-slate-500 bg-white rounded-xl border border-red-100 shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      <div className="inline-flex items-center justify-center w-8 h-8 text-red-500 bg-red-50 rounded-lg">
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <div className="ml-3 text-sm font-medium text-slate-800">{message}</div>

      <button
        onClick={onClose}
        className="ml-auto -mx-1.5 -my-1.5 text-slate-400 hover:text-slate-900 rounded-lg p-1.5 hover:bg-slate-50 inline-flex h-8 w-8"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
