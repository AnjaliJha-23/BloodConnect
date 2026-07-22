import { useEffect, useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import StatCard from "../../components/Admin/StatCard";
import api from "../../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import {
  FaUsers,
  FaTint,
  FaHeartbeat,
  FaCheckCircle,
} from "react-icons/fa";

import "./Analytics.css";

const COLORS = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
];

function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/admin/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data)
    return (
      <AdminLayout>
        <h2>Loading...</h2>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <h1 className="analytics-title">
        Analytics Dashboard
      </h1>

      <div className="analytics-cards">

        <StatCard
          title="Total Users"
          value={data.summary.totalUsers}
          icon={<FaUsers />}
          color="#3b82f6"
        />

        <StatCard
          title="Available Donors"
          value={data.summary.availableDonors}
          icon={<FaTint />}
          color="#22c55e"
        />

        <StatCard
          title="Open Requests"
          value={data.summary.openRequests}
          icon={<FaHeartbeat />}
          color="#f59e0b"
        />

        <StatCard
          title="Completed"
          value={data.summary.completedRequests}
          icon={<FaCheckCircle />}
          color="#ef4444"
        />

      </div>

      <div className="charts-grid">

        <div className="chart-card">

          <h3>Blood Group Distribution</h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart data={data.bloodGroups}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="_id" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#ef4444"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

        <div className="chart-card">

          <h3>Request Status</h3>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <PieChart>

              <Pie
                data={data.requestStatus}
                dataKey="count"
                nameKey="_id"
                outerRadius={110}
                label
              >
                {data.requestStatus.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

      <div className="chart-card">

        <h3>Monthly User Registrations</h3>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={data.monthlyUsers}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="_id" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </AdminLayout>
  );
}

export default Analytics;