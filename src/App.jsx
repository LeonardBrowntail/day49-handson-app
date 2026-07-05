// ============================================================
// App — definisi semua Route + pembagian akses:
//   Public  : /, /products, /login, /register
//   Login   : /dashboard   (ProtectedRoute)
//   Admin   : /admin        (ProtectedRoute requireAdmin)
// ============================================================

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
// import Products from "./pages/Products";
import Login from "./pages/Login";
// import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

function App() {
	return (
		<>
			<Navbar />

			<Routes>
				{/* Public Routes */}
				<Route path="/" element={<Home />} />
				{/* <Route path="/products" element={<Products />} /> */}
				<Route path="/login" element={<Login />} />
				{/* <Route path="/register" element={<Register />} /> */}

				{/* Protected Route (harus login) */}
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>

				{/* Admin Route (harus login + role admin) */}
				<Route
					path="/admin"
					element={
						<ProtectedRoute requireAdmin={true}>
							<Admin />
						</ProtectedRoute>
					}
				/>

				{/* 404 sederhana */}
				<Route
					path="*"
					element={
						<div className="page">
							<h1>404</h1>
							<p>Halaman tidak ditemukan.</p>
						</div>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
