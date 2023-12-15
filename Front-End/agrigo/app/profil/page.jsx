"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { redirect, useRouter } from "next/navigation";

export default function Home() {
    const [username, setUsername] = useState('');
    const router = useRouter();
    const [alamat, setAlamat] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const username = localStorage.getItem('name');
            setUsername(username);

            const nilaiDariLocalStorage = localStorage.getItem('alamat');
            setAlamat(nilaiDariLocalStorage);
            console.log('Data', alamat)
        }


    }, []);

    const handleLogout = async (e) => {
        try {
            const response = await fetch('http://52.221.249.20:8080/api/logout', {
                method: 'POST', // Atau metode HTTP yang sesuai
            });
            if (response.ok) {
                console.log('Logout berhasil');
                localStorage.clear();
                router.push('/login');

            } else {
                console.error('Gagal logout');
            }
        } catch (error) {
            console.error('Terjadi kesalahan', error);
        }
    }


    function clearLocalStorage() {
        localStorage.clear();
        console.log('LocalStorage telah dihapus');
    }




    return (
        <>
            <nav className=" bg-lime-700 px-4">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <a href="landingPage">
                            <img href="/landingPage" src='img/logosm.png' alt='logo'></img>
                        </a>
                        <div className="flex space-x-4 items-center">
                            <a href="/pesananSaya" className="text-white">Pesanan Saya</a>
                            <a href="/profil">
                                {username && <img href="/profil"
                                    className=' rounded-full h-11' src={`http://52.221.249.20:8080/api/generateAvatar?name=${username}`} alt='Avatar'></img>}
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <main className=' bg-white h-full self-center flex flex-col justify-center items-center'>
                <div className=" pt-16 px-48 mx-48 pb-10">
                    <h1 className=" text-black text-4xl font-bold">
                        Profil
                    </h1>
                </div>

                <div className=' flex self-center pt-10  flex-col justify-center items-center'>
                    <div className='flex-col justify-center items-center'>
                        <div className=' flex flex-col justify-center items-center' >
                            <h1 className='text-black text-xl font-bold' > Avatar Profil</h1>
                        </div>
                        <div className=' flex flex-col justify-center items-center'>

                        </div>
                        <div className='flex flex-col justify-center items-center rounded-lg bg-custom-F2F2F2 p-6 mt-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'>
                            <div className="self-center">
                                {username && (
                                    <img className="p-2 aspect-w-1 self-center aspect-h-1 w-80 h-80" href="#" alt='avatar' src={`http://52.221.249.20:8080/api/generateAvatar?name=${username}`}></img>
                                )}
                            </div>
                            <div>
                                <button onClick={handleLogout} className="text-red-600 bg-white border-red-600 border-2 w-80 h-10 rounded-lg font-bold">
                                    Logout
                                </button>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center text-center  mb-8 w-full items-center self-center'>
                            <div className=' w-96'>
                                <p className=" text-black text-xl font-semibold pt-12 pb-5">Alamat Pengiriman</p>
                            </div>
                            <div className="rounded-lg text-black p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-custom-F2F2F2 w-fit ">
                                <p
                                    className="text-base text-custom-7C7C7C  ">
                                    {alamat}
                                </p>
                            </div>

                        </div>
                    </div>


                    <div className='  pr-48 mr-48 w-full'>
                    </div>
                </div>


            </main>
            <footer className="bg-gray-200 p-4 text-center">
                <p className="text-sm text-gray-600">
                    AgriGo © 2023. All rights reserved.
                </p>
            </footer>
        </>
    )
}