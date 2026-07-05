// Halaman Admin — hanya untuk role admin (diproteksi ProtectedRoute requireAdmin).
// Memanggil endpoint khusus admin: GET /api/admin/users (butuh Bearer token).

function Admin() {
	return (
		<div className="page">
			<h1>Panel Admin</h1>
			<p>Halaman ini hanya bisa diakses oleh admin.</p>
		</div>
	);
}

export default Admin;
