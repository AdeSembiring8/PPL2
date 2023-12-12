"use client"
import { useEffect, useState } from "react";
import ProvinceDropdown from './ProvinceDropdown';

export default function Home({ params }) {
    const [productDetails, setProductDetails] = useState(null);
    const [qty, setQty] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const [totalFinal, setTotalFinal] = useState(null);

    const handleSelectProvince = (selectedValue,villages,selectedValueDistrict) => {
        console.log('Id Provinsi : ', selectedValue);
        console.log('Id Kabupaten : ', villages);
        console.log('Id Kecamatan : ', selectedValueDistrict)
    }

    useEffect(() => {
        async function test() {
            try {
                const response = await fetch(`http://52.221.249.20:8080/api/products/${params.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProductDetails(data.data)

                    const searchParams = new URLSearchParams(location.search);
                    const qty = searchParams.get('qty');
                    setQty(qty);

                    const price = data.data.price || 0;
                    const totalPrice = price * qty;
                    setTotalPrice(totalPrice);

                    const totalFinal = totalPrice + 2000;
                    setTotalFinal(totalFinal);

                } else {
                    console.error('Error fetching product details:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }
        test()
    }, [])


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
                                <img className="p-2 aspect-w-1 aspect-h-1 w-40 h-40" href="#" src={productDetails != null && productDetails.image}></img>
                                <div className=" ml-10 my-5">
                                    <h5
                                        className="mb-2 text-xl font-bold leading-tight text-black">
                                        {productDetails != null && productDetails.name}
                                    </h5>
                                    <p className="mb-4 text-base text-slate-500 font-medium ">
                                        {productDetails != null && productDetails.category}
                                    </p>
                                    <p className=" text-black text-l font-semibold">
                                        {qty} {productDetails != null && productDetails.unit}
                                    </p>
                                    <p className=" text-lg text-black font-medium">
                                        Total : Rp {totalPrice != null && totalPrice.toLocaleString('id-ID')}
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
                                <div className=" ml-48 my-5  text-lg text-black dlex flex-col items-end">
                                    <p class="  font-medium ">
                                        Rp {totalPrice != null && totalPrice.toLocaleString('id-ID')}
                                    </p>
                                    <p class="  font-medium ">
                                        Rp 2.000
                                    </p>
                                    <p class=" text-lg mt-11 text-black font-bold ">
                                        Rp {totalFinal != null && totalFinal.toLocaleString('id-ID')}
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

                    <div className=" text-black">
                        <ProvinceDropdown onSelectProvince={handleSelectProvince} />
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
