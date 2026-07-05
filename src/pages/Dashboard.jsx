// Halaman Dashboard — hanya untuk yang sudah login.
// Menampilkan konten berbeda berdasarkan role (Conditional UI).
import { useAuth } from "../context/AuthContext";

function Dashboard() {
	const { user, isAdmin } = useAuth();

	return (
		<div className="page">
			<h1>Dashboard</h1>

			<div className="info-card">
				<p>
					<strong>Nama:</strong> {user?.name}
				</p>
				<p>
					<strong>Email:</strong> {user?.email}
				</p>
				<p>
					<strong>Role:</strong> {isAdmin ? "Administrator" : "User"}
				</p>
			</div>

			{/* Conditional UI: box ini HANYA muncul untuk admin */}
			{isAdmin && (
				<div className="admin-box">
					<h3>Menu Admin</h3>
					<ul>
						<li>Kelola produk</li>
						<li>Lihat semua user</li>
						<li>Laporan penjualan</li>
					</ul>
				</div>
			)}
		</div>
	);
}

export default Dashboard;
