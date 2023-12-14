"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react';



export default function Home() {
    const [username, setUsername] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const username = localStorage.getItem('name');
            console.log(username);
            setUsername(username);
            if (username) {
                getTransactionByUsername(username);
            }
        }
    }, []);

    // ... (kode sebelumnya)

    const getTransactionByUsername = async (username) => {
        try {
            const response = await fetch(`http://52.221.249.20:8080/api/transactions/${username}`);
            if (response.ok) {
                const transactionData = await response.json();

                for (const transaction of transactionData.data) {
                    const productId = transaction.productId;

                    const productResponse = await fetch(`http://52.221.249.20:8080/api/products/${productId}`);
                    if (productResponse.ok) {
                        const productData = await productResponse.json();
                        transaction["productDetails"] = productData.data
                    } else {
                        console.error('Error fetching product details:', productResponse.status, productResponse.statusText);
                        productsArray.push(null); // Menambahkan null ke dalam array jika terjadi kesalahan
                    }
                }
                setTransactions(transactionData.data)
                console.log(transactionData.data)
            } else {
                console.error('Error fetching transaction details:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching transaction details:', error);
        }

    };

    // ... (kode render transaksi dan detail produk)



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
                                {username && <img href="/profil"
                                    className=' rounded-full h-11' src={`http://52.221.249.20:8080/api/generateAvatar?name=${username}`} alt='Avatar'></img>}
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <main className=' bg-white h-full py-4'>
                <div className=" pt-16 px-14 pb-10">
                    <h1 className=" text-black text-4xl font-bold">
                        Pesanan Saya
                    </h1>
                </div>
                {transactions.map((transaction, index) => (
                    <div className="block rounded-lg bg-custom-F2F2F2 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] my-5 w-2/5 mx-14">
                        <div className="flex justify-between">
                            <div className="flex">
                                <img className="p-2 aspect-w-1 aspect-h-1 w-40 h-40" href="#" src={transaction.productDetails.image}></img>
                                <div className=" ml-10 my-5">
                                    <h5
                                        class="mb-2 text-xl font-bold leading-tight text-black">
                                        {transaction.productDetails.name}
                                    </h5>
                                    <p class="mb-4 text-base text-slate-500 font-medium ">
                                        {transaction.productDetails.category}
                                    </p>
                                    <p class="  text-black text-sm">
                                        {transaction.quantity} {transaction.productDetails.unit}
                                    </p>
                                    <p class=" text-lg text-black font-medium">
                                        Total: Rp {(transaction.quantity * transaction.productDetails.price) + transaction.adminFee + transaction.shippingFee}
                                    </p>
                                </div>
                                <div className=' pt-20 pl-48'>
                                    <p class="text-black font-medium mb-2">
                                        Status :
                                    </p>
                                    <button className=' bg-custom-E3B100 w-44 h-7 rounded-lg'>
                                        {transaction.paymentStatus}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </main >
            <footer className="bg-gray-200 p-4 text-center">
                <p className="text-sm text-gray-600">
                    AgriGo © 2023. All rights reserved.
                </p>
            </footer>


        </>
    )
}