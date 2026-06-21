import React, { useEffect } from "react";
import styles from "./Notification.module.css";

/**
 * Komponen Notification untuk menampilkan toast messages
 * @param {string} type - Tipe notifikasi: 'success', 'error', 'warning', 'info'
 * @param {string} message - Pesan notifikasi
 * @param {boolean} show - Kontrol show/hide
 * @param {function} onClose - Callback saat notifikasi ditutup
 * @param {number} duration - Durasi auto-dismiss dalam ms (default: 3000)
 */
function Notification({
  type = "info",
  message,
  show,
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show || !message) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
        return "ℹ";
      default:
        return "•";
    }
  };

  return (
    <div className={`${styles.notification} ${styles[`notification_${type}`]}`}>
      <div className={styles.content}>
        <span className={styles.icon}>{getIcon()}</span>
        <p className={styles.message}>{message}</p>
      </div>
      <button className={styles.closeBtn} onClick={onClose}>
        ✕
      </button>
    </div>
  );
}

export default Notification;
