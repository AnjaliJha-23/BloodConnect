import { useEffect, useState } from "react";
import {
  FaUsers,
  FaTint,
  FaHeartbeat,
  FaCheckCircle,
} from "react-icons/fa";

import api from "../../services/api";

import AdminLayout from "../../components/Admin/AdminLayout";
import StatCard from "../../components/Admin/StatCard";

import "./Admin.css";

function AdminDashboard() {
  const [stats, setStats] =useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data.stats);
    } catch (err) {
      console.error(err);
    }
  };

  if (!stats) {
    return (
      <AdminLayout>
        <h2>Loading...</h2>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <div className="dashboard-grid">

        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          color="#2563eb"
          icon={<FaUsers />}
        />

        <StatCard
          title="Available Donors"
          value={stats.availableDonors}
          color="#16a34a"
          icon={<FaHeartbeat />}
        />

        <StatCard
          title="Blood Requests"
          value={stats.totalRequests}
          color="#ef4444"
          icon={<FaTint />}
        />

        <StatCard
          title="Completed"
          value={stats.completedRequests}
          color="#f59e0b"
          icon={<FaCheckCircle />}
        />

      </div>

    </AdminLayout>
  );
}

export default AdminDashboard;