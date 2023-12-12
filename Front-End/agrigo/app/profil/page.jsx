import Image from 'next/image'

export default function Home() {
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
                                <img href="/profil" src='img/iconUser.png'></img>
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
                            <div className=" flex-auto">
                                <div className="">
                                    <img className="p-2 aspect-w-1 aspect-h-1 max-w-72 max-h-80" href="#" src='https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcR9HnulCAFkllQVXlFhwtgtsTHN3TSFu1x-FtRi7vYAwuLnyfSbT2N9tPeKEWhZGQww'></img>
                                </div>
                                <div className=' '>
                                    <button className=" text-white bg-custom-C2AF00 w-96 h-10 rounded-lg my-5 font-bold self-center">
                                        Unggah Foto
                                    </button>
                                </div>
                                <div>
                                    <button className=" text-red-600 bg-white border-red-600 border-2 w-96 h-10 rounded-lg font-bold">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=' ml-40 pr-48 mr-48 w-full'>
                        <div>
                            <label className="text-black text-xl font-bold" for="username">Username</label><br />
                            <input className="bg-gray-200 text-black shadow-inner rounded p-2 w-full" type="text" id="username" name="username" /> <br />
                        </div>
                        <div className="pt-5">
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
                        </div>
                        <div className="pt-24 self-end">
                            <button className=" text-white bg-custom-92B150 w-96 h-10 rounded-lg font-bold self-center">
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}