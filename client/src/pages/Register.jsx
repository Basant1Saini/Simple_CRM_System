import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create Account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} type="text" placeholder="Full Name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input style={styles.input} type="email" placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input style={styles.input} type="password" placeholder="Password (min 6 chars)" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
        <button type="submit" style={styles.btn}>Register</button>
        <p style={{ textAlign: "center", marginTop: "12px" }}>
          Have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" },
  form: { background: "#fff", padding: "32px", borderRadius: "8px", width: "360px", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" },
  title: { marginBottom: "20px", textAlign: "center" },
  input: { display: "block", width: "100%", padding: "10px", marginBottom: "14px", border: "1px solid #ddd", borderRadius: "4px", boxSizing: "border-box" },
  btn: { width: "100%", padding: "10px", background: "#e94560", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" },
  error: { color: "red", marginBottom: "12px", textAlign: "center" },
};

export default Register;
