import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertTriangle, X, Info } from "lucide-react";

const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

// Configuration for the new dialog styles
const dialogConfig = {
  success: {
    Icon: Check,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    buttonBg: "bg-emerald-600 hover:bg-emerald-700",
  },
  warning: {
    Icon: AlertTriangle,
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
    iconColor: "text-amber-600 dark:text-amber-400",
    buttonBg: "bg-amber-600 hover:bg-amber-700",
  },
  error: {
    Icon: X,
    iconBg: "bg-rose-100 dark:bg-rose-900/50",
    iconColor: "text-rose-600 dark:text-rose-400",
    buttonBg: "bg-rose-600 hover:bg-rose-700",
  },
  info: {
    Icon: Info,
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    buttonBg: "bg-blue-600 hover:bg-blue-700",
  },
};

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const notify = (message, options = {}) => {
    const { type = "info", title = "Notification", duration = 6000 } = options;
    setNotification({ message, type, title, duration });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  // Auto-hide timer
  useEffect(() => {
    if (notification && notification.duration) {
      const timer = setTimeout(closeNotification, notification.duration);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

      <AnimatePresence>
        {notification && (() => {
          const { Icon, iconBg, iconColor, buttonBg } =
            dialogConfig[notification.type] || dialogConfig.info;

          return (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={closeNotification} // optional close on click
              />

              {/* Dialog Box */}
              <motion.div
                key="dialog"
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="fixed inset-0 flex items-center justify-center p-4 z-50"
              >
                <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
                  <div className="p-2 text-center">
                    <div
                      className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${iconBg}`}
                    >
                      <Icon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
                    </div>
                    <div className="mt-4">
                      {/* <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {notification.title}
                      </h3> */}
                      <p className="mt-2 text-md font-semibold text-gray-700 dark:text-white">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 rounded-b-2xl">
                    <button
                      onClick={closeNotification}
                      type="button"
                      className={`inline-flex w-full justify-center rounded-xl px-4 py-2.5 cursor-pointer text-sm font-semibold text-white shadow-sm transition-colors ${buttonBg}`}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          );
        })()}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
}
