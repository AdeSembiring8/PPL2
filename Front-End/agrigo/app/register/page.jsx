'use client';
import { useState } from 'react';
import { redirect, useRouter } from "next/navigation";


export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alreadyExistPopup, setAlreadyExistPopup] = useState(false);
  const [showPasswordMismatchPopup, setShowPasswordMismatchPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const router = useRouter();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setShowPasswordMismatchPopup(false);
    setAlreadyExistPopup(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Your API endpoint
    const apiUrl = 'http://52.221.249.20:8080/api/register';

    // Prepare the request body
    const requestBody = {
      username,
      password,
    };

    // Check if the password is not empty
    if (!password) {
      console.error('Password is required');
      return;
    }

    if (password !== confirmPassword) {
      setShowPasswordMismatchPopup(true);
      return; // Stop the form submission
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
        // Registration successful, you can handle the response accordingly
        console.log('Registration successful');
        setSuccessPopup(true);
        router.push('/login');

      } else if (response.status == 409) {
        console.log('Username already exists');
        setAlreadyExistPopup(true);

      } else {
        // Registration failed, handle the error
        console.error('Registration failed');
      }

    } catch (error) {
      console.error('Error during registration', error);
    }
  };
  const closePopup = () => {
    setAlreadyExistPopup(false);
    setSuccessPopup(false);
    setShowPasswordMismatchPopup(false);
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[url('/img/bg_login.png')] w-full h-screen bg-center bg-cover">
      <div className="flex w-1/3 bg-white self-end h-screen text-black flex-col">
        <img className='pt-14 px-14 w-96 h-auto self-center' src='img/logo.png' alt="Logo" />
        <h1 className='font-extrabold text-4xl self-center font-fredoka mt-17'>Daftar Akun </h1>

        <h3 className="self-center text-sm pt-2">Silahkan isi data berikut untuk mendaftar</h3>

        <form className="px-5 mx-10 mt-10" onSubmit={handleFormSubmit}>
          <div>
            <label className="" htmlFor="username">Username</label><br />
            <input className="bg-gray-200 shadow-inner rounded mt-2 p-2 w-full" type="text" id="username" name="username" onChange={(e) => { setUsername(e.target.value); setAlreadyExistPopup(false); }} /><br />
          </div>
          {alreadyExistPopup && (
            <div className="popup">
              <p className=' text-red-600'>Username Sudah Terdaftar!</p>
              {/* <button onClick={closePopup}>Tutup</button> */}
            </div>
          )}
          <div className="pt-5">
            <label className="" htmlFor="password">Password</label><br />
            <input className="bg-gray-200 shadow-inner rounded mt-2 p-2 w-full" type="password" id="password" name="password" onChange={(e) => {setPassword(e.target.value);setShowPasswordMismatchPopup(false);}} /> <br />
          </div>

          <div className="pt-5">
            <label className="" htmlFor="password">Konfirmasi Password</label><br />
            <input className="bg-gray-200 shadow-inner rounded mt-2 p-2 w-full" type="password" id="confirmPassword" name="confirmPassword" onChange={(e) => { setConfirmPassword(e.target.value); setShowPasswordMismatchPopup(false); }} /> <br />
          </div>
          {showPasswordMismatchPopup && (
            <div className="popup">
              <p className=' text-red-600'>Password dan konfirmasi password tidak sesuai.</p>
            </div>
          )}
          <a href="/login">
            <div className="mt-10">
              <button className='bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-3 w-full rounded font-bold' type='submit'
                disabled={!password}>
                register
              </button>
            </div>
          </a>
          {successPopup && (
            <div className="popup">
              <p className=' text-green-600'>Akun berhasil didaftarkan Anda akan diarahkan ke Halaman Login !</p>
            </div>
          )}
        </form>
        <hr className="mx-10 mt-10 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="mt-4 text-center">
          <p>Sudah punya akun? <a href="/login" className='font-bold'> Login Sekarang!</a></p>
        </div>
        <div className="mt-20 text-center font-light text-base ">
          <p>AgriGo © 2023. All rights reserved.</p>
        </div>
      </div>
    </main>
  );
}
