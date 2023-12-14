'use client';
import Image from 'next/image';
import { useState } from 'react';
import { redirect, useRouter } from "next/navigation";
import GoogleButton from 'react-google-button'

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalidUsernameorPasswordPopup, setInvalidUsernameorPasswordPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const router = useRouter();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }


  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const apiUrl = 'http://52.221.249.20:8080/api/login';

    const requestBody = {
      username,
      password,
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log('Login Successful');
        const data = await response.json();
        const token = data.data.token;
        console.log('Response Data:', data);
        localStorage.setItem('name', username);
        router.push('/landingPage');


        // Simpan token dalam localStorage
        if (token) {
          // Simpan token dalam localStorage
          localStorage.setItem('token', token);
          console.log('Token:', token);
        } else {
          console.error('Token not found in response data');
        }
        setSuccessPopup(true);
      }
      else if (response.status == 401) {
        console.log('Invalid Username or Password')
        setInvalidUsernameorPasswordPopup(true);
      }
    } catch (error) {
      console.error('Error during Login', error);
    }
  };

  // Contoh menggunakan Google OAuth untuk mendapatkan token
  // Pastikan untuk menggunakan library OAuth atau mengikuti langkah-langkah yang sesuai untuk mendapatkan token dari Google

  const handleLoginWithGoogle = async (e) => {
    try {
      const googleAccessToken = await getGoogleAccessToken(); // Fungsi untuk mendapatkan token dari Google
      const response = await fetch('http://52.221.249.20:8080/api/login/google', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${googleAccessToken}`, // Gunakan token dari Google untuk autentikasi
          'Content-Type': 'application/json' // Sesuaikan dengan tipe konten yang diperlukan oleh endpoint
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login dengan Google berhasil:', data);
        // Lakukan tindakan lanjutan setelah berhasil login
      } else {
        // Penanganan ketika login gagal
        console.error('Gagal login dengan Google');
      }
    } catch (error) {
      console.error('Terjadi kesalahan', error);
    }
  }

  // const closePopup = () => {
  //   setInvalidUsernameorPasswordPopup(false);
  // };

  // Fungsi untuk login dengan Google menggunakan API

  // Trigger login with Google saat tombol login ditekan
  // document.getElementById('loginWithGoogleButton').addEventListener('click', async () => {
  //   const loginButton = document.getElementById('loginWithGoogleButton');
  //   if (loginButton) {
  //     loginButton.addEventListener('click', async () => {
  //       await loginWithGoogle();
  //       // Lakukan operasi lain setelah login selesai
  //     });
  //   } else {
  //     console.error('Elemen loginWithGoogleButton tidak ditemukan');
  //   }
  // });

  return (
    <main className="flex min-h-smicreen flex-col items-center justify-between bg-[url('/img/bg_login.png')] w-full h-full bg-center bg-cover">
      <div className="flex w-1/3 bg-white self-end h-screen text-black flex-col">
        <div className=' pt-14 px-14 w-96 h-auto self-center'>
          <Image  src='/img/logo.png' alt='Logo' width={500} height={200}></Image>
        </div>

        <h1 className='font-extrabold text-4xl self-center font-fredoka mt-17'>Selamat Datang!</h1>

        <h3 className="self-center text-sm pt-2">Silahkan masuk dengan akun anda</h3>

        <form className="px-5 mx-10 mt-10" onSubmit={handleFormSubmit}>
          <div>
            <label className="" htmlFor="username">Username</label><br />
            <input className="bg-gray-200 shadow-inner rounded mt-2 p-2 w-full" type="text" id="username" name="username" onChange={(e) => { setUsername(e.target.value); setInvalidUsernameorPasswordPopup(false); setSuccessPopup(false); }} /> <br />
          </div>
          <div className="pt-5">
            <label className="" htmlFor="password">Password</label><br />
            <input className="bg-gray-200 shadow-inner rounded mt-2 p-2 w-full" type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value); setInvalidUsernameorPasswordPopup(false); setSuccessPopup(false); }} /> <br />
          </div>
          {invalidUsernameorPasswordPopup && (
            <div className='popup '>
              <p className=' text-red-600 self-center'>Username atau Password Salah ! </p>
            </div>
          )}
          {successPopup && (
            <div className="popup ">
              <p className=' text-green-600 text-center font-bold pt-4'>Login Berhasil ! </p>
            </div>
          )}
          <div className="mt-10">
            <button className='bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-3 w-full rounded font-bold' type='submit'>
              Login
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
            <GoogleButton
              clientId="YOUR_GOOGLE_CLIENT_ID"
              buttonText="Login with Google"
              onSuccess={handleLoginWithGoogle}
              onFailure={handleLoginWithGoogle}
              cookiePolicy={'single_host_origin'}
              type="dark"
            />
          </div>

          {/* <div>
          <button onClick={handleLoginWithGoogle}>
            Login With Google
          </button>
        </div> */}
        </form>
        <hr className="mx-10 mt-16 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="mt-4 text-center">
          <p>Belum punya akun? <a href="/register" className='font-bold'> daftar sekarang!</a></p>
        </div>
        <div className="mt-20 text-center font-light text-base ">
          <p>AgriGo © 2023. All rights reserved.</p>
        </div>
      </div>
    </main>
  )
}
