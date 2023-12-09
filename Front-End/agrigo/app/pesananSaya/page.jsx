import Image from 'next/image'

export default function Home() {
    return (
        <>
            <nav class=" bg-lime-700 px-4">
                <div class="container mx-auto">
                    <div class="flex items-center justify-between">
                        <a href="landingPage">
                            <img href="/landingPage" src='img/logosm.png'></img>
                        </a>
                        <div class="flex space-x-4 items-center">
                            <a href="/pesananSaya" className="text-white">Pesanan Saya</a>
                            <a href="/profil">
                                <img href="/profil" src='img/iconUser.png'></img>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <main className=' bg-white h-screen'>
                <div className=" pt-16 px-14 pb-10">
                    <h1 className=" text-black text-4xl font-bold">
                        Pesanan Saya
                    </h1>
                </div>
                <div className="block rounded-lg bg-custom-F2F2F2 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-2/5 mx-14">
                    <div className="flex justify-between">
                        <div className="flex">
                            <img className="p-2 aspect-w-1 aspect-h-1 w-40 h-40" href="#" src='https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcR9HnulCAFkllQVXlFhwtgtsTHN3TSFu1x-FtRi7vYAwuLnyfSbT2N9tPeKEWhZGQww'></img>
                            <div className=" ml-10 my-5">
                                <h5
                                    class="mb-2 text-xl font-bold leading-tight text-black">
                                    Beras
                                </h5>
                                <p class="mb-4 text-base text-slate-500 font-medium ">
                                    Bahan pokok
                                </p>
                                <p class="  text-black text-sm">
                                    2Kg
                                </p>
                                <p class=" text-lg text-black font-medium">
                                    Total: Rp 24.260
                                </p>
                            </div>
                            <div className=' pt-20 pl-48'>
                                <p class="text-black font-medium mb-2">
                                    Status :
                                </p>
                                <button className=' bg-custom-E3B100 w-44 h-7 rounded-lg'>
                                    Proses Verifikasi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}