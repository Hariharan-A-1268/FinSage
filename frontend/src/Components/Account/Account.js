import React, { useState, useEffect } from "react";

const AccountPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Failed to fetch user data:", err));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdateName = () => {
    const token = localStorage.getItem("token");
    fetch("/api/user/profile/update-name", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: user.name }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Name updated successfully!");
        } else {
          alert("Failed to update name.");
        }
      })
      .catch((err) => console.error("Error updating name:", err));
  };

  const handleResetPassword = () => {
    const token = localStorage.getItem("token");

    fetch("/api/user/reset-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newPassword }),
    })
      .then((res) => {
        if (res.ok) {
          window.alert("✅ Password updated successfully!");
          setNewPassword(""); // Clear input
        } else {
          return res.json().then((data) => {
            throw new Error(data.message || "Failed to update password");
          });
        }
      })
      .catch((err) => {
        console.error("Error resetting password:", err);
        window.alert(`❌ ${err.message}`);
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#0A1932",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "500px",
          padding: "40px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#0A1932",
          color: "white",
        }}
      >
        <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
          Account Settings
        </h2>

        {/* Name Input + Save Button */}
        <div style={{ marginBottom: "15px", width: "99%" }}>
          <label style={{ marginBottom: "5px", display: "block" }}>Name:</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              style={{ flex: 1, padding: "8px" }}
            />
            <button
              onClick={handleUpdateName}
              style={{
                background: "#28a745",
                color: "white",
                padding: "8px 12px",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              Save
            </button>
          </div>
        </div>

        {/* Email (Read-only) */}
        <div
          style={{
            marginBottom: "15px",
            display: "flex",
            flexDirection: "column",
            width: "95%",
          }}
        >
          <label style={{ marginBottom: "5px" }}>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            readOnly
            style={{
              width: "100%",
              padding: "8px",
              backgroundColor: "#e9ecef",
              color: "#6c757d",
              border: "1px solid #ced4da",
            }}
          />
        </div>

        {/* Password Reset Field */}
        <div
          style={{
            marginBottom: "15px",
            display: "flex",
            flexDirection: "column",
            width: "95%",
          }}
        >
          <label style={{ marginBottom: "5px" }}>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            style={{
              width: "100%",
              padding: "8px",
              backgroundColor: "#ffffff",
              color: "#000000",
              border: "1px solid #ced4da",
            }}
          />
        </div>

        {/* Action Buttons */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={handleResetPassword}
            style={{
              background: "blue",
              color: "white",
              padding: "8px",
              border: "none",
              cursor: "pointer",
              width: "48%",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            Reset Password
          </button>
          <button
            style={{
              background: "red",
              color: "white",
              padding: "8px",
              border: "none",
              cursor: "pointer",
              width: "48%",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
