import { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/leads/dashboard")
      .then(({ data }) => setStats(data))
      .catch(() => setError("Failed to load dashboard"));
  }, []);

  if (error) return <p style={{ color: "red", padding: "24px" }}>{error}</p>;
  if (!stats) return <p style={{ padding: "24px" }}>Loading...</p>;

  return (
    <div style={styles.page}>
      <h2>Dashboard</h2>
      <div style={styles.grid}>
        <StatCard label="Total Leads" value={stats.totalLeads} />
        <StatCard label="Won Leads" value={stats.wonLeads} />
        <StatCard label="Pipeline Value" value={`$${stats.totalPipelineValue.toLocaleString()}`} />
      </div>
      <h3 style={{ marginTop: "32px" }}>Leads by Stage</h3>
      <table style={styles.table}>
        <thead>
          <tr><th style={styles.th}>Stage</th><th style={styles.th}>Count</th></tr>
        </thead>
        <tbody>
          {stats.stageBreakdown.map((s) => (
            <tr key={s._id}>
              <td style={styles.td}>{s._id}</td>
              <td style={styles.td}>{s.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div style={styles.card}>
    <p style={styles.cardLabel}>{label}</p>
    <p style={styles.cardValue}>{value}</p>
  </div>
);

const styles = {
  page: { padding: "24px" },
  grid: { display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "16px" },
  card: { background: "#fff", padding: "20px 28px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", minWidth: "160px" },
  cardLabel: { color: "#888", fontSize: "0.85rem", margin: 0 },
  cardValue: { fontSize: "1.8rem", fontWeight: "bold", margin: "4px 0 0" },
  table: { width: "100%", maxWidth: "400px", borderCollapse: "collapse", marginTop: "12px" },
  th: { textAlign: "left", padding: "8px 12px", background: "#f5f5f5", border: "1px solid #ddd" },
  td: { padding: "8px 12px", border: "1px solid #ddd", textTransform: "capitalize" },
};

export default Dashboard;
