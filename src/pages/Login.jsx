// ============================================================
// Halaman Login
//
// Flow: Validate -> POST /api/login -> simpan token + user -> /dashboard
// ============================================================

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../api/client";

function Login() {
	const navigate = useNavigate();
	const { login } = useAuth();

	const [form, setForm] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState({});
	const [serverError, setServerError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const validate = () => {
		const newErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!form.email.trim()) {
			newErrors.email = "Email wajib diisi";
		} else if (!emailRegex.test(form.email)) {
			newErrors.email = "Format email tidak valid";
		}

		if (!form.password) newErrors.password = "Password wajib diisi";

		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setServerError("");

		const validationErrors = validate();
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length > 0) return;

		setSubmitting(true);
		try {
			const data = await apiRequest("/login", {
				method: "POST",
				body: { email: form.email, password: form.password },
			});

			login(data.token, data.user); // simpan token + user
			navigate("/dashboard");
		} catch (err) {
			setServerError(err.message || "Login gagal");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="form-page">
			<div className="form-card">
				<h2>Login</h2>

				{serverError && <div className="alert-error">{serverError}</div>}

				<form onSubmit={handleSubmit} noValidate>
					<div className="field">
						<label>Email</label>
						<input
							type="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							className={errors.email ? "input-error" : ""}
						/>
						{errors.email && (
							<small className="error-text">{errors.email}</small>
						)}
					</div>

					<div className="field">
						<label>Password</label>
						<input
							type="password"
							name="password"
							value={form.password}
							onChange={handleChange}
							className={errors.password ? "input-error" : ""}
						/>
						{errors.password && (
							<small className="error-text">{errors.password}</small>
						)}
					</div>

					<button type="submit" disabled={submitting} className="btn-primary">
						{submitting ? "Memproses..." : "Login"}
					</button>
				</form>

				<p className="form-footer">
					Belum punya akun? <Link to="/register">Daftar di sini</Link>
				</p>

				<div className="hint">
					<p>
						<strong>Akun uji coba:</strong>
					</p>
					<p>admin@mail.com / password (admin)</p>
					<p>user@mail.com / password (user)</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
