import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Notification from "../../../components/Notification/Notification";
import styles from "./KelolaUser.module.css";

function KelolaUser() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Notification State
  const [notification, setNotification] = useState({
    show: false,
    type: "info",
    message: "",
  });

  // Confirm Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    id: null,
  });

  // State Form disesuaikan dengan field di database
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  // Helper function untuk show notification
  const showNotification = (type, message, duration = 3000) => {
    setNotification({
      show: true,
      type,
      message,
    });
    // Auto close notification setelah duration
    setTimeout(
      () => {
        setNotification((prev) => ({ ...prev, show: false }));
      },
      duration > 0 ? duration : 3000,
    );
  };

  // Ganti port jika backend berjalan di port yang berbeda
  const API_URL = "http://localhost:3000/api/users";

  // READ: Fetch semua user
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      setUsers(result.data || []);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
      showNotification("error", "Gagal mengambil data user");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validasi Form
  const validateForm = () => {
    if (!formData.username.trim()) {
      showNotification("warning", "Username harus diisi");
      return false;
    }
    if (!formData.email.trim()) {
      showNotification("warning", "Email harus diisi");
      return false;
    }
    if (!isEditMode && !formData.password.trim()) {
      showNotification("warning", "Password harus diisi untuk user baru");
      return false;
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification("warning", "Format email tidak valid");
      return false;
    }
    return true;
  };

  // CREATE & UPDATE: Submit data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const token = localStorage.getItem("authToken");

    if (!token) {
      showNotification("error", "Anda harus login terlebih dahulu");
      return;
    }

    const data = {
      username: formData.username,
      email: formData.email,
      role: formData.role,
    };

    // Hanya include password jika diisi
    if (formData.password.trim()) {
      data.password = formData.password;
    }

    try {
      const url = isEditMode ? `${API_URL}/${currentId}` : API_URL;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Gagal menyimpan user",
        );
      }

      showNotification(
        "success",
        isEditMode ? "User berhasil diperbarui" : "User berhasil ditambahkan",
      );

      fetchUsers();
      closeModal();
    } catch (error) {
      console.error(error);
      showNotification("error", error.message);
    }
  };

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  // DELETE - Show confirmation modal
  const openDeleteConfirm = (id) => {
    setConfirmModal({
      isOpen: true,
      id,
    });
  };

  // DELETE - Execute deletion
  const confirmDelete = async () => {
    const id = confirmModal.id;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setConfirmModal({ isOpen: false, id: null });
      showNotification("success", "User berhasil dihapus");
      fetchUsers();
    } catch (error) {
      console.error(error);
      showNotification("error", error.message);
    }
  };

  // Logika Buka/Tutup Modal
  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({
      username: "",
      email: "",
      password: "",
      role: "user",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setIsEditMode(true);
    setCurrentId(user.id_user);
    setFormData({
      username: user.username || "",
      email: user.email || "",
      password: "", // Kosong untuk security
      role: user.role || "user",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Helper untuk badge role
  const getRoleBadgeClass = (role) => {
    return role === "admin" ? styles.roleBadgeAdmin : styles.roleBadgeUser;
  };

  return (
    <div className={styles.pageContainer}>
      <Sidebar />

      {/* Notification Toast */}
      <Notification
        type={notification.type}
        message={notification.message}
        show={notification.show}
        onClose={() => setNotification((prev) => ({ ...prev, show: false }))}
      />

      {/* Confirm Modal */}
      {confirmModal.isOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setConfirmModal({ isOpen: false, id: null })}
        >
          <div
            className={styles.confirmModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.confirmHeader}>
              <h3>⚠️ Hapus User</h3>
            </div>
            <p className={styles.confirmMessage}>
              Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
            <div className={styles.confirmFooter}>
              <button
                onClick={() => setConfirmModal({ isOpen: false, id: null })}
                className={styles.cancelBtn}
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className={styles.confirmDeleteBtn}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <main className={styles.mainContent}>
        <div className={styles.headerSection}>
          <div>
            <h1 className={styles.pageTitle}>Kelola User</h1>
            <p className={styles.pageSubtitle}>
              Kelola akun pengguna yang terdaftar di PopTube
            </p>
          </div>

          <button onClick={openAddModal} className={styles.addButton}>
            + Tambah User
          </button>
        </div>

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span>Total User</span>
            <h3>{users.length}</h3>
          </div>

          <div className={styles.statCard}>
            <span>Admin</span>
            <h3>{users.filter((u) => u.role === "admin").length}</h3>
          </div>

          <div className={styles.statCard}>
            <span>User Regular</span>
            <h3>{users.filter((u) => u.role === "user").length}</h3>
          </div>
        </section>

        {/* Tabel Data User */}
        <div className={styles.tableWrapper}>
          {isLoading ? (
            <div className={styles.loadingMessage}>
              <p>Memuat data user...</p>
            </div>
          ) : (
            <table className={`w-full text-left border-collapse`}>
              <thead>
                <tr
                  className={`border-b border-gray-700 ${styles.textSecondary}`}
                >
                  <th className="py-3 px-4 font-medium">ID</th>
                  <th className="py-3 px-4 font-medium">Username</th>
                  <th className="py-3 px-4 font-medium">Email</th>
                  <th className="py-3 px-4 font-medium">Role</th>
                  <th className="py-3 px-4 font-medium text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user.id_user}
                      className={`${styles.tableRow} ${styles.textMain}`}
                    >
                      <td className="py-3 px-4 font-semibold">
                        #{user.id_user}
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {user.username}
                      </td>
                      <td className="py-3 px-4 text-sm">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={getRoleBadgeClass(user.role)}>
                          {user.role === "admin" ? "🔑 Admin" : "👤 User"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => openEditModal(user)}
                            className={styles.editBtn}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openDeleteConfirm(user.id_user)}
                            className={styles.deleteBtn}
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className={`py-6 text-center ${styles.textSecondary}`}
                    >
                      Belum ada data user. Silakan tambah data baru.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Modal Tambah / Edit */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center ${styles.modalOverlay}`}
        >
          <div
            className={`${styles.card} w-full max-w-2xl p-6 md:p-8 relative`}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className={`text-3xl font-bold ${styles.textMain}`}>
                {isEditMode ? "Edit User" : "Tambah User Baru"}
              </h2>

              <button
                type="button"
                onClick={closeModal}
                className={styles.closeBtn}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label className={`block mb-1 text-sm ${styles.textSecondary}`}>
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-md ${styles.modalInput}`}
                  placeholder="Masukkan username"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={`block mb-1 text-sm ${styles.textSecondary}`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-md ${styles.modalInput}`}
                  placeholder="Masukkan email"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={`block mb-1 text-sm ${styles.textSecondary}`}>
                  Password{" "}
                  {isEditMode && "(Kosongkan jika tidak ingin mengubah)"}
                </label>
                <input
                  type="password"
                  name="password"
                  required={!isEditMode}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-md ${styles.modalInput}`}
                  placeholder={
                    isEditMode
                      ? "Biarkan kosong jika tidak ingin mengubah"
                      : "Masukkan password"
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label className={`block mb-1 text-sm ${styles.textSecondary}`}>
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-md ${styles.modalInput}`}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  onClick={closeModal}
                  className={styles.cancelBtn}
                >
                  Batal
                </button>

                <button type="submit" className={styles.saveBtn}>
                  {isEditMode ? "Simpan Perubahan" : "Simpan User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default KelolaUser;
