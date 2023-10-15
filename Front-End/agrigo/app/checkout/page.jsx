export default function Home() {

    return (
        <>
            <nav class=" bg-lime-700 px-4">
                <div class="container mx-auto">
                    <div class="flex items-center justify-between">
                        <img href="#" src='img/logosm.png'></img>
                        <div class="flex space-x-4 items-center">
                            <a href="#" className="text-white">Pesanan Saya</a>
                            <img href="#" src='img/iconUser.png'></img>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="bg-white">
                <div className=" pt-10 px-14">
                    <h1 className=" text-black text-4xl font-bold">
                        Checkout
                    </h1>
                    <div>
                        <p className=" text-black text-xl font-semibold pt-12 pb-5">Alamat Pengiriman</p>
                    </div>
                    <div className="block rounded-lg  p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-custom-F2F2F2 w-2/5 ">
                        <p class="text-base text-custom-7C7C7C flex ">
                            Masukkan Alamat
                        </p>
                    </div>
                    <div>
                        <button className=" text-white bg-custom-C2AF00 w-64 h-10 rounded-lg my-5">
                            Ubah alamat pengiriman
                        </button>
                    </div>
                    <div>
                        <p className=" text-black text-xl font-semibold pt-8 pb-5">Paket Pengiriman</p>
                    </div>
                    <div className="block rounded-lg bg-custom-F2F2F2 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-1/3">
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
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className=" text-black text-xl font-semibold pt-8 pb-5">Paket Pengiriman</p>
                    </div>
                    <div className="block rounded-lg p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-custom-F2F2F2 w-1/6 ">
                        <p class="text-base text-custom-7C7C7C flex ">
                            Pilih Paket Pengiriman
                        </p>
                    </div>
                    <div>
                        <button className=" text-white bg-custom-C2AF00 w-36 h-10 rounded-lg my-5">
                            Ubah paket
                        </button>
                    </div>
                    <div>
                        <p className=" text-black text-xl font-semibold pt-8 pb-5">Tujuan Pembayaran</p>
                    </div>
                    <div className="block rounded-lg p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-custom-F2F2F2 w-1/6  ">
                        <p class="text-base text-custom-7C7C7C flex ">
                            Pilih Bank Tujuan
                        </p>
                    </div>
                    <div>
                        <button className=" text-white bg-custom-C2AF00 w-36 h-10 rounded-lg my-5">
                            Ubah tujuan
                        </button>
                    </div>
                    <div>
                        <p className=" text-black text-xl font-semibold pt-8 pb-5">Total Tagihan</p>
                    </div>
                    <div className="block rounded-lg bg-custom-E2DDDD p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-1/3">
                        <div className="flex justify-between">
                            <div className="flex">
                                <div className=" ml-3 my-5 text-lg text-black">
                                    <p class="  font-medium">
                                        Harga Pesanan
                                    </p>
                                    <p class="  font-medium">
                                        Biaya Administrasi
                                    </p>
                                    <p class=" text-lg mt-11 text-black font-bold">
                                        Total Biaya:
                                    </p>
                                </div>
                                <div className=" ml-80 my-5  text-lg text-black text-right">
                                    <p class="  font-medium ">
                                        Rp24.260
                                    </p>
                                    <p class="  font-medium ">
                                        Rp2.000
                                    </p>
                                    <p class=" text-lg mt-11 text-black font-bold ">
                                        Rp26.260
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className=" text-white bg-custom-E2DDDD w-64 h-14 rounded-lg my-5">
                            Lanjut Pembayaran
                        </button>
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
