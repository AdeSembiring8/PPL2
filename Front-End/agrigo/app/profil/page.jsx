"use client"
import Image from 'next/image'
import { useState,useEffect } from 'react';

export default function Home() {
    const [name, setName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInputVisible, setInputVisible] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleGenerateAvatar = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://52.221.249.20:8080/api/generateAvatar?name=${name}`);
            if (response.ok) {
                const data = await response.blob();
                const imgUrl = URL.createObjectURL(data);
                setAvatarUrl(imgUrl);

                // Simpan URL gambar ke dalam localStorage
                localStorage.setItem('avatarUrl', JSON.stringify(imgUrl));
            } else {
                console.error('Failed to fetch avatar:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error generating avatar:', error);
        } finally {
            setIsLoading(false);
        }
        setInputVisible(false);
    };

    const handleBuatAvatar = () => {
        setInputVisible(true);
    }

    useEffect(() => {
        const fetchAvatar = async () => {
          setIsLoading(true);
          try {
            const response = await fetch('http://52.221.249.20:8080/api/getAvatar');
            if (response.ok) {
              const data = await response.json();
              setAvatarUrl(data.avatarUrl);
            } else {
              console.error('Failed to fetch avatar:', response.status, response.statusText);
            }
          } catch (error) {
            console.error('Error fetching avatar:', error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchAvatar();
      }, []);
    return (
        <>
            <nav className=" bg-lime-700 px-4">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <a href="landingPage">
                            <img href="/landingPage" src='img/logosm.png'></img>
                        </a>
                        <div className="flex space-x-4 items-center">
                            <a href="/pesananSaya" className="text-white">Pesanan Saya</a>
                            <a href="/profil">
                                {avatarUrl && <img href="/profil" src={avatarUrl} alt='Avatar'></img>}
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
                            <h1 className='text-black text-xl font-bold' > Foto Profil</h1>
                        </div>
                        <div className="block rounded-lg bg-custom-F2F2F2 p-6 ml-96 mt-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-fit ">
                            <div className="">
                                <div className=" self-center">
                                    {avatarUrl && <img className="p-2 aspect-w-1 self-center aspect-h-1 w-80 h-80" href="#" src={avatarUrl}></img>}
                                </div>
                                <div className=' '>
                                    <button
                                        onClick={handleBuatAvatar}
                                        className="text-white bg-custom-C2AF00 w-80 h-10 rounded-lg my-5 font-bold self-center">
                                        Buat Avatar
                                    </button>
                                </div>
                                <div>
                                    <button className=" text-red-600 bg-white border-red-600 border-2 w-80 h-10 rounded-lg font-bold">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className=' ml-40 pr-48 mr-48 w-full'>

                        {
                            isInputVisible && (
                                <div>
                                    <div>
                                        <label className="text-black text-xl font-bold" for="username" >Masukkan Nama </label><br />
                                        <input className="bg-gray-200 text-black shadow-inner rounded p-2 w-full" type="text" id="username" name="username" value={name} onChange={handleNameChange} /> <br />
                                    </div>
                                    <div className="pt-24 self-end">
                                        <button onClick={handleGenerateAvatar} disabled={!name || isLoading} className=" text-white bg-custom-92B150 w-96 h-10 rounded-lg font-bold self-center">
                                            Buat Sekarang
                                        </button>
                                    </div>

                                </div>

                            )
                        }

                        {/* <div className="pt-5">
                            <label className="text-black text-xl font-bold" for="password">Password</label><br />
                            <input className="bg-gray-200 text-black shadow-inner rounded  p-2 w-full" type="password" id="password" name="password" /> <br />
                        </div>
                        <div className="pt-5">
                            <label className="text-black text-xl font-bold" for="konfirmasiPassword">Konfirmasi Password</label><br />
                            <input className="bg-gray-200 text-black shadow-inner rounded  p-2 w-full" type="password" id="konfirmasiPassword" name="konfirmasiPassword" /> <br />
                        </div>
                        <div className="pt-7">
                            <label className="text-black text-xl font-bold">Alamat Utama</label><br />
                            <button className=" text-white bg-custom-C2AF00 w-96 h-10 rounded-lg font-bold self-center">
                                Ubah Alamat Utama
                            </button>
                        </div> */}

                    </div>
                </div>
            </main>
        </>
    )
}