// ============================================================
// Helper kecil untuk memanggil API Laravel.
// Otomatis menambahkan header Authorization: Bearer <token>
// jika token ada di localStorage.
// ============================================================

import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const apiClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

// Sertakan token kalau ada -> Bearer Header
apiClient.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}
	return config;
});

/**
 * Fungsi request generik.
 * @param {string} path   contoh: "/login"
 * @param {object} options { method, body }
 */
export async function apiRequest(path, { method = "GET", body } = {}) {
	try {
		const res = await apiClient.request({
			url: path,
			method,
			data: body,
		});
		return res.data;
	} catch (err) {
		// Kalau status bukan 2xx, lempar error yang membawa data dari server.
		// Ini penting supaya frontend bisa baca data.errors (validasi Laravel).
		const data = err.response?.data ?? null;
		const error = new Error(data?.message || "Terjadi kesalahan");
		error.status = err.response?.status;
		error.data = data; // data.errors ada di sini kalau validasi gagal
		throw error;
	}
}
