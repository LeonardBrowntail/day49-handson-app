// ============================================================
// Navbar dinamis (memanfaatkan AuthContext):
//   - Sudah login  -> "Halo, [nama]!" + tombol Logout
//   - Belum login  -> link Login | Daftar
//   - Admin        -> muncul link Admin
// ============================================================

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../api/client";

function Navbar() {
	const { user, isLoggedIn, isAdmin, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			// Beri tahu server untuk hapus token (opsional tapi rapi)
			await apiRequest("/logout", { method: "POST" });
		} catch (e) {
			// Walaupun request logout gagal, kita tetap bersihkan sisi client.
		}
		logout();
		navigate("/login");
	};

	return (
		<nav className="navbar">
			<div className="nav-left">
				<Link to="/" className="brand">
					AuthApp
				</Link>
				<Link to="/products">Produk</Link>
				{isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
				{isAdmin && <Link to="/admin">Admin</Link>}
			</div>

			<div className="nav-right">
				{isLoggedIn ? (
					<>
						<span className="greeting">Halo, {user?.name}!</span>
						<button onClick={handleLogout} className="btn-logout">
							Logout
						</button>
					</>
				) : (
					<>
						<Link to="/login">Login</Link>
						<Link to="/register">Daftar</Link>
					</>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
