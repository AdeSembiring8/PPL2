"use client"
import { useEffect, useState } from "react";
import ProvinceDropdown from './ProvinceDropdown';
import Image from 'next/image';

// export const handleCloseModalAlamat = (setAlamatModalVisible) => {
//     setAlamatModalVisible(false);
// };

export default function Home({ params }) {
    const [productDetails, setProductDetails] = useState(null);
    const [qty, setQty] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const [totalFinal, setTotalFinal] = useState(null);
    const [pengiriman, setPengiriman] = useState(null);
    const [isAlamatModalVsible, setAlamatModalVisible] = useState(false);
    const [isPengirimanVisible, setPengirimanVisible] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedRegencyId, setSelectedRegencyId] = useState('');
    const [selectedDistrictId, setSelectedDistrictId] = useState('');
    const [selectedVillageId, setSelectedVillageId] = useState('');
    const [valueAlamat, setValueAlamat] = useState('');
    const [username, setUsername] = useState('');
    const [estimasi, setEstimasi] = useState('');
    const [paketPengiriman, setPaketPengriman] = useState('');
    const [address, setDataAddress] = useState('');
    const [productId, setProductID] = useState('');

    const handleSelectProvince = (selectedValues) => {
        setSelectedProvince(selectedValues.provinceName);
        setSelectedRegencyId(selectedValues.regencyName);
        setSelectedDistrictId(selectedValues.districtName);
        setSelectedVillageId(selectedValues.villageName);
    }


    const handlePengiriman = () => {
        setPengirimanVisible(true);
    }

    const handleClosePengiriman = () => {
        const newPengiriman = 10000;
        const paketPengiriman = "Reguler";
        const estimasi = "Estimasi Sampai dalam 1 hari";
        setPaketPengriman(paketPengiriman);
        setEstimasi(estimasi);
        setPengiriman(newPengiriman);
        setPengirimanVisible(false);


        localStorage.setItem('shipping :', paketPengiriman);
        localStorage.setItem('quantity :', qty);
        localStorage.setItem('total :', totalPrice);
        localStorage.setItem('adminFee :', 10000);
        localStorage.setItem('shippingFee :', 10000);
    }
    const handleUbahAlamat = () => {
        setAlamatModalVisible(true);
    };

    const handleCloseModalAlamat = (valueAlamat) => {
        setValueAlamat(valueAlamat);
        setAlamatModalVisible(false);
        const DataAddress = `${valueAlamat}, Provinsi ${selectedProvince}, ${selectedRegencyId}, Kec. ${selectedDistrictId}, Kel/Desa. ${selectedVillageId}`;
        setDataAddress(DataAddress);
        localStorage.setItem('alamat', DataAddress);

    };


    useEffect(() => {
        // Menghitung ulang totalFinal saat nilai pengiriman berubah
        async function test() {
            try {
                const response = await fetch(`http://52.221.249.20:8080/api/products/${params.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProductDetails(data.data);
                    const productID = (data.data._id)
                    setProductID(productID);
                    localStorage.setItem('productId', productID);

                    const searchParams = new URLSearchParams(location.search);
                    const qty = searchParams.get('qty');
                    setQty(qty);

                    const price = data.data.price || 0;
                    const totalPrice = price * qty;
                    setTotalPrice(totalPrice);

                    const totalFinal = totalPrice + 10000;
                    setTotalFinal(totalFinal);
                    // Memanggil fungsi perhitungan saat nilai pengiriman berubah
                    if (pengiriman !== null) {
                        const totalFinal = totalPrice + 20000;
                        setTotalFinal(totalFinal);
                    };
                    if (typeof window !== 'undefined') {
                        const username = localStorage.getItem('name');
                        setUsername(username);
                    };
                } else {
                    console.error('Error fetching product details:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }
        const handleClosePengiriman = () => {
            const newPengiriman = 10000;
            const paketPengiriman = "Reguler";
            const estimasi = "Estimasi Sampai dalam 1 hari";
            setPaketPengriman(paketPengiriman);
            setEstimasi(estimasi);
            setPengiriman(newPengiriman);
            setPengirimanVisible(false);


            localStorage.setItem('shipping :', paketPengiriman);
            localStorage.setItem('quantity :', qty);
            localStorage.setItem('total :', totalPrice);
            localStorage.setItem('adminFee :', 10000);
            localStorage.setItem('shippingFee :', 10000);
        }
        // const calculateTotalFinal = () => {
        //     let totalFinal;
        //     if (pengiriman > 0) {
        //         const totalFinal = totalPrice + 12000;
        //         setTotalFinal(totalFinal);
        //     } else {
        //         const totalFinal = totalPrice + 2000;
        //         setTotalFinal(totalFinal);
        //     }
        // };

        test();
    }, [pengiriman,params.id, qty, totalPrice]);


    const handleCheckout = async (e) => {
        e.preventDefault()
        const dataToSend = {
            userId: username,
            productId: productId,
            address: address,
            shipping: paketPengiriman,
            quantity: parseInt(qty),
            total: totalPrice,
            shippingFee: 10000,
            adminFee: 10000

        };
        console.log("DATA", dataToSend)
        fetch('http://52.221.249.20:8080/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(dataToSend)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle data from the API response if needed
                console.log('Data berhasil dikirim:', data);
                window.snap.pay(data.data.token)
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('Terjadi kesalahan:', error);
            });

    }

    return (
        <>
            <nav className=" bg-lime-700 px-4">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <a href="landingPage">
                            <img src='/img/logosm.png' alt="logo" ></img>
                        </a>
                        <div className="flex space-x-4 items-center">
                            <a href="/pesananSaya" className="text-white">Pesanan Saya</a>
                            <a href="/profil">
                                {username && <img className=' rounded-full h-11' src={`http://52.221.249.20:8080/api/generateAvatar?name=${username}`} alt='Avatar'></img>}
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
                    <div className="block rounded-lg text-black p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-custom-F2F2F2 w-2/5 ">
                        <p
                            className="text-base text-custom-7C7C7C flex ">
                            {valueAlamat ? `${valueAlamat}, Provinsi ` : `Masukkan Alamat`}
                            {selectedProvince ? `${selectedProvince}` : ``}
                            {selectedRegencyId ? `, ${selectedRegencyId}` : ``}
                            {selectedDistrictId ? `, Kec. ${selectedDistrictId}` : ``}
                            {selectedVillageId ? `, Kel/Desa. ${selectedVillageId}` : ``}
                        </p>
                    </div>
                    <div>
                        <button
                            onClick={handleUbahAlamat}
                            className=" text-white bg-custom-C2AF00 w-64 h-10 rounded-lg my-5">
                            Ubah alamat pengiriman
                        </button>
                    </div>

                    {isAlamatModalVsible && (
                        <div className=" text-black">
                            <ProvinceDropdown onSelectProvince={handleSelectProvince} oneCloseModalAlamat={handleCloseModalAlamat} />

                        </div>
                    )}

                    <div>
                        <p className=" text-black text-xl font-semibold pt-8 pb-5">Produk yang Dipesan</p>
                    </div>
                    <div className="block rounded-lg bg-custom-F2F2F2 p-6 w-fit shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
                        <div className="flex justify-between">
                            <div className="flex">
                                <img className="p-2 aspect-w-1 aspect-h-1 w-40 h-40" href="#" alt="Produk" src={productDetails != null && productDetails.image}></img>
                                <div className=" ml-40 mr-20 my-5">
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
                    <div className=" text-black block rounded-lg p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-custom-F2F2F2 w-1/6 ">
                        <p className="text-lg font-semibold text-start">{paketPengiriman ? `${paketPengiriman}` : `Pilih Paket Pengiriman`} </p>
                        <p className="text-base text-custom-7C7C7C flex ">
                            {estimasi ? `${estimasi}` : ``}
                        </p>
                    </div>
                    <div>
                        <button
                            onClick={handlePengiriman}
                            className=" text-white bg-custom-C2AF00 w-36 h-10 rounded-lg my-5">
                            Ubah paket
                        </button>
                    </div>
                    {isPengirimanVisible && (
                        <div className="block rounded-lg text-black p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-custom-F2F2F2 w-fit" >
                            <h1 className="text-black text-xl font-semibold pb-5 text-center">Pilih Paket Pengiriman</h1>
                            <button onClick={handleClosePengiriman}>
                                <div className="block rounded-lg text-black p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-custom-F2F2F2 w-fit">
                                    <p className=" text-lg font-semibold text-start ">Reguler</p>
                                    <p className=" text-custom-7C7C7C">Estimasi Sampai dalam 1 hari</p>
                                </div>
                            </button>

                        </div>
                    )};

                    <div>
                        <p className=" text-black text-xl font-semibold pt-8 pb-5">Total Tagihan</p>
                    </div>
                    <div className="block rounded-lg bg-custom-E2DDDD w-fit p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
                        <div className="flex justify-between">
                            <div className="flex">
                                <div className=" ml-3 my-5 text-lg text-black">
                                    <p className="  font-medium">
                                        Harga Pesanan
                                    </p>
                                    <p className="  font-medium">
                                        Biaya Pengiriman
                                    </p>
                                    <p className="  font-medium">
                                        Biaya Administrasi
                                    </p>
                                    <p className=" text-lg mt-11 text-black font-bold">
                                        Total Biaya:
                                    </p>
                                </div>
                                <div className=" ml-48 my-5  text-lg text-black dlex flex-col items-end">
                                    <p className="  font-medium ">
                                        Rp {totalPrice != null && totalPrice.toLocaleString('id-ID')}
                                    </p>
                                    <p className="  font-medium ">
                                        Rp {pengiriman != null && pengiriman.toLocaleString('id-ID')}
                                    </p>
                                    <p className="  font-medium ">
                                        Rp 10.000
                                    </p>
                                    <p className=" text-lg mt-11 text-black font-bold ">
                                        Rp {totalFinal != null && totalFinal.toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleCheckout} className=" text-white bg-custom-E2DDDD w-64 h-14 rounded-lg my-5">
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


