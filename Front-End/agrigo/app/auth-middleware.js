// auth-middleware.js
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';

export const protectRoute = (handler) => async (ctx) => {
  const { req, res } = ctx;
  const cookies = parseCookies(ctx);
  const token = cookies.token;

  // Jika tidak ada token, redirect ke halaman login
  if (!token) {
    const router = useRouter();
    res.writeHead(302, { Location: '/login' });
    res.end();
    return { props: {} };
  }

  // Validasi token di sisi server (lakukan validasi sesuai kebutuhan Anda)
  // Contoh: gunakan library seperti jsonwebtoken untuk validasi
  // const isValidToken = validateToken(token);
  // if (!isValidToken) {
  //   ... Handle token tidak valid ...
  // }

  // Jalankan handler untuk halaman yang memerlukan autentikasi
  return await handler(ctx);
};
