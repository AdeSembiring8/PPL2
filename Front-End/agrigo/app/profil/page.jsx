"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { redirect, useRouter } from "next/navigation";

export default function Home() {
    const [username, setUsername] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const username = localStorage.getItem('name');
            setUsername(username);
        }
    }, []);

    const handleLogout = async  (e) => {
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

            <main className=' bg-white h-screen'>
                <div className=" pt-16 px-48 mx-48 pb-10">
                    <h1 className=" text-black text-4xl font-bold">
                        Edit Profil
                    </h1>
                </div>

                <div className='flex pt-10'>
                    <div className=''>
                        <div className=' px-48 ml-48' >
                            <h1 className='text-black text-xl font-bold' > Avatar Profil</h1>
                        </div>
                        <div className="block rounded-lg bg-custom-F2F2F2 p-6 ml-96 mt-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-fit ">
                            <div className="">
                                <div className=" self-center">
                                    {username && <img className="p-2 aspect-w-1 self-center aspect-h-1 w-80 h-80" href="#" alt='avatar' src={`http://52.221.249.20:8080/api/generateAvatar?name=${username}`}></img>}
                                </div>
                                <div className=' '>
                                    <button
                                        className="text-white bg-custom-C2AF00 w-80 h-10 rounded-lg my-5 font-bold self-center">
                                        Foto Avatar
                                    </button>
                                </div>
                                <div>
                                    <button onClick={handleLogout}
                                    className=" text-red-600 bg-white border-red-600 border-2 w-80 h-10 rounded-lg font-bold">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' ml-40 pr-48 mr-48 w-full'>
                    </div>
                </div>
            </main>
        </>
    )
}