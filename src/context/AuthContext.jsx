// ============================================================
// AuthContext — State auth GLOBAL (analogi: sistem keamanan pusat gedung)
//
// 3 Langkah (sesuai slide):
//   1. Create Context
//   2. Provider Component
//   3. Custom Hook useAuth()
// ============================================================

import { createContext, useContext, useState, useEffect } from "react";

// --- Langkah 1: Create Context ---
const AuthContext = createContext(null);

// --- Langkah 2: Provider Component ---
export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	// loading = true saat pertama kali app dibuka & kita cek localStorage.
	// Penting supaya ProtectedRoute tidak salah redirect sebelum data siap.
	const [loading, setLoading] = useState(true);

	// Saat app pertama dimuat / setelah refresh:
	// baca kembali token & user dari localStorage -> status login tetap ada.
	useEffect(() => {
		const savedUser = localStorage.getItem("user");
		const token = localStorage.getItem("token");

		if (token && savedUser) {
			const parsed = JSON.parse(savedUser);
			setUser(parsed);
			setIsAdmin(parsed.role === "admin"); // cek role
		}

		setLoading(false);
	}, []);

	// Fungsi login: dipanggil setelah request /login atau /register berhasil.
	const login = (token, userData) => {
		localStorage.setItem("token", token);
		localStorage.setItem("user", JSON.stringify(userData));
		setUser(userData);
		setIsAdmin(userData.role === "admin");
	};

	// Fungsi logout: bersihkan semua.
	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);
		setIsAdmin(false);
	};

	// Ambil token untuk dipakai di request API.
	const getToken = () => localStorage.getItem("token");

	// Value yang dibagikan ke seluruh komponen (sesuai slide):
	const value = {
		user,
		isLoggedIn: !!user, // true kalau user tidak null
		isAdmin,
		loading,
		login,
		logout,
		getToken,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// --- Langkah 3: Custom Hook ---
// Supaya komponen cukup: const { user, isLoggedIn } = useAuth();
export function useAuth() {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
	}
	return context;
}
