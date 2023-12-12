import Image from 'next/image';

export default function Home() {

    return (
        <>
            <nav class=" bg-lime-700 px-4">
                <div class="container mx-auto">
                    <div class="flex items-center justify-between">
                        <img href="#" src='img/logosm.png'></img>
                        <div class="space-x-4">
                            <a href="#produkkami" className="text-white">Produk Kami</a>
                            <a href="#tentangkami" className="text-white">Tentang Kami</a>
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                <div className="flex">
                    <div className="w-3/5 bg-lime-200 pt-8 px-">
                        <h1 className=' text-slate-950 text-6xl font-extrabold pt-40 px-14'>
                            Hasil Pertanian dan Perkebunan Berkualitas di Ujung Jari Anda
                        </h1>
                        <p className=' text-slate-950 text-2xl pt-16 font-medium px-14'>
                            Bergabung untuk belanja sekarang dan memperoleh produk berkualitas tinggi dengan mudah
                        </p>
                        <div className=' pt-16 px-14'>
                            {/* <Link href="/dashboard">
                                <a className="text-white"> */}
                            <a href='/dashboard'>
                                <button className="bg-custom-C2AF00 w-48 h-12 rounded-lg font-semibold">
                                    Mulai Belanja
                                </button>
                            </a>
                            {/* </a>
                            </Link> */}
                        </div>
                    </div>
                    <div className="w-3/4 ml-auto">
                        <img src="img/aboutus.png" alt="About Us" className="w-full" />
                    </div>
                </div>

                <div id='produkkami' className=' bg-white flex items-center justify-center pt-36'>
                    <h3 className=' text-black font-bold text-3xl self-center'>
                        Produk Kami
                    </h3>
                </div>
                <div className='flex flex-col items-center  bg-white'>
                    <div className='flex px-6 py-20' >
                        <button className=' text-xl bg-custom-E4E4E4 text-black w-48 h-12 rounded-lg font-semibold shadow-md mr-14 '>
                            Bibit Tanaman
                        </button >
                        <button className=' text-xl bg-custom-E4E4E4 text-black w-48 h-12 rounded-lg font-semibold shadow-md mr-14 '>
                            Bahan Pokok
                        </button >

                        <button className=' text-xl bg-custom-E4E4E4 text-black w-48 h-12 rounded-lg font-semibold shadow-md '>
                            Rempah-rempah
                        </button>
                    </div>
                    <div className='flex px-6' >
                        <button className=' text-xl bg-custom-E4E4E4 text-black w-48 h-12 rounded-lg font-semibold shadow-md mr-14'>
                            Buah-buahan
                        </button >

                        <button className=' text-xl bg-custom-E4E4E4 text-black w-48 h-12 rounded-lg font-semibold shadow-md '>
                            Sayur-sayuran
                        </button>
                    </div>
                </div>
                <div id='tentangkami' className=' bg-white flex items-center justify-center pt-36 '>
                    <h3 className=' text-black font-bold text-3xl self-center'>
                        Tentang Kami
                    </h3>
                </div>
                <div className='bg-white font-medium text-black py-12 px-80 text-center text-xl '>
                    <p> AgriGo merupakan aplikasi e-commerce untuk produk pertanian dan perkebunan Indonesia. AgriGo hadir untuk memudahkan petani dan konsumen produk di seluruh Indonesia. Dengan menyediakan sebuah platform yang memungkinkan petani untuk membeli dan menjual produk mereka dengan mudah, produktivitas pertanian dapat meningkat dan memudahkan konsumen untuk mendapatkan produk yang diinginkan. </p>
                    <p className=' mt-11'> Di AgriGo, kami percaya bahwa inovasi adalah kunci untuk kemajuan pertanian. Kami terus mendorong inovasi dalam teknologi pertanian, menyediakan akses ke produk-produk berkualitas tinggi, dan menjembatani kesenjangan antara produsen dan konsumen. Kami selalu berusaha untuk menghadirkan produk-produk terbaik dengan harga yang terjangkau. </p>
                </div>

            </main>

            <footer className="bg-gray-200 p-4 text-center">
                <p className="text-sm text-gray-600">
                    AgriGo © 2023. All rights reserved.
                </p>
            </footer>


        </>

    );
};
