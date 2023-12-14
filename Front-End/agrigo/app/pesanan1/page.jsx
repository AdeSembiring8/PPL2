"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react';

export default function Home() {
    // State untuk menyimpan data transaksi
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

    // Fungsi untuk mendapatkan transaksi berdasarkan username
    const getTransactionByUsername = async (username) => {
        try {
            const response = await fetch(`http://52.221.249.20:8080/api/transactions/${username}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data); // Log the data received from the API
                if (Array.isArray(data.data)) {
                    setTransactions(data.data); // Set data transaksi ke state transactions
                    getProductDetails(data.data); // Ambil detail produk
                } else {
                    console.error('Received data is not an array.');
                }
            } else {
                console.error('Error fetching transaction details:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching transaction details:', error);
        }
    };

    // Fungsi untuk mendapatkan detail produk
    const getProductDetails = async (transactions) => {
        try {
            const productIds = transactions.map(transaction => transaction.productId);
            const promises = productIds.map(productId =>
                fetch(`http://52.221.249.20:8080/api/products/${productId}`)
            );
            const responses = await Promise.all(promises);
            const productsData = await Promise.all(responses.map(res => res.json()));
            setProductDetails(productsData);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    return (
        <>
            {/* Navbar */}
            {/* ... (bagian Navbar) */}

            {/* Konten Utama */}
            <main className=' bg-white h-screen'>
                <div className=" pt-16 px-14 pb-10">
                    <h1 className=" text-black text-4xl font-bold">
                        Pesanan Saya
                    </h1>
                </div>
                
                {/* Tampilan Produk */}
                {productDetails.map((product, index) => (
                    <div key={index} className="product-details">
                        {product ? (
                            <>
                                <h2>{product.name}</h2>
                                <p>Category: {product.category}</p>
                                <p>Price: Rp {product.price}</p>
                                <p>Unit: {product.unit}</p>
                                <Image src={product.image} alt={product.name} />
                                {/* Tambahkan informasi detail produk lainnya */}
                            </>
                        ) : (
                            <p>Error fetching product details</p>
                        )}
                    </div>
                ))}

            </main>
        </>
    )
}
