// ============================================================
// ProtectedRoute — "Pintu dengan akses kartu"
//
// - Cek isLoggedIn  -> belum login? redirect ke /login
// - Cek requireAdmin -> bukan admin? redirect ke /dashboard
// ============================================================

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, requireAdmin = false }) {
	const { isLoggedIn, isAdmin, loading } = useAuth();

	// Tunggu sampai AuthContext selesai baca localStorage.
	// Kalau tidak, saat refresh user bisa "terlempar" ke /login sesaat.
	if (loading) return <p style="pad-6">Memuat...</p>;

	// Belum login -> ke halaman login
	if (!isLoggedIn) return <Navigate to="/login" replace />;

	// Butuh admin tapi bukan admin -> ke dashboard biasa
	if (requireAdmin && !isAdmin) return <Navigate to="/dashboard" replace />;

	// Lolos semua pengecekan -> tampilkan halaman
	return children;
}

export default ProtectedRoute;
