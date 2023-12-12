'use client'
// import Image from 'next/image'
import { useEffect, useState } from 'react';
import React from 'react';
// import { useRouter } from 'next/router';
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // const [searchResults, setSearchResults] = useState([]);
  // const router = useRouter();
  // const [selectedProducts, setSelectedProducts] = useState([]);
  const [isCheckoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState({});
  const [productDetails, setProductDetails] = useState(null);
  // const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure({ defaultOpen: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://52.221.249.20:8080/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.data);
        } else {
          console.error('Error fetching data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setProducts]);

  // const handleAddToCart = (product) => {
  //   setSelectedProducts([...selectedProducts, product]);
  //   setSelectedProductQuantity({
  //     ...selectedProductQuantity,
  //     [product._id]: 1, // Set the default quantity to 1
  //   });
  // };

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://52.221.249.20:8080/api/products?search=${searchTerm}`);
      const data = await response.json();

      // Perbarui state dengan hasil pencarian
      setSearchResults(data.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  //membuat tampilan Modal
  // Fungsi untuk menutup modal checkout
  const handleCloseCheckoutModal = () => {
    setCheckoutModalVisible(false);
  };

  const productNames = products.map(product => product.name);


  // Fungsi untuk mengambil detail produk berdasarkan ID
  const getProductById = async (productId) => {
    try {
      const response = await fetch(`http://52.221.249.20:8080/api/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        return data.data; // Mengembalikan data produk
      } else {
        console.error('Error fetching product details:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleProductDetails = async (productId) => {
    const productDetails = await getProductById(productId);

    console.log('Product Detail:', productDetails);
    setProductDetails(productDetails);


    setSelectedProductQuantity({
      ...selectedProductQuantity,
      [productId]: 1,
    });

    // Tampilkan modal checkout
    setCheckoutModalVisible(true);
    return productDetails;
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setSelectedProductQuantity({
      ...selectedProductQuantity,
      [productId]: newQuantity,
    });
  };
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

      <main className="flex min-h-screen flex-col p-20 bg-white w-full h-full bg-center bg-cover">
        <h1 className="text-black font-extrabold text-7xl mb-8">Mau belanja apa hari ini?</h1>

        <div className="grid grid-cols-3">
          <div className="col-span-2">
            {/* Menampilkan hasil pencarian */}
            {/* {searchResults.map((product) => (
              <div key={product._id} className="card block rounded-lg bg-custom-F2F2F2 p-1 m-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.8),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-full">
                <div className="flex justify-between">
                  <div className="flex">
                    <img className="p-2 aspect-w-1 aspect-h-1 w-40 h-40" href="#" src={product.image} alt={product.name}></img>
                    <div className="flex flex-col m-0">
                      <h5 className="mb-2 text-xl mt-4 font-bold leading-tight text-black">{product.name}</h5>
                      <p className="mb-4 text-base text-slate-500 font-medium ">{product.category}</p>
                      <p className="mt-4 mb-0 text-start text-lg text-black font-medium">
                        {`Rp${product.price} / ${product.unit}`}
                      </p>
                    </div>
                  </div>
                  <a href='/checkout'>
                    <button
                      type="button"
                      className="self-end  text-black rounded bg-primary px-6 pb-2 pt-2.5 text-4xl font-extrabold uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] "
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      +
                    </button>
                  </a>
                </div>
              </div>
            ))} */}

            {/* Menampilkan produk yang bukan hasil pencarian */}
            {products.reduce((rows, product, index) => {
              if (index % 2 === 0) rows.push([]);
              rows[rows.length - 1].push(product);
              return rows;
            }, []).map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map(product => (
                  <div key={product._id} className="card block rounded-lg bg-custom-F2F2F2 p-1 m-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.8),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-full">
                    <div className="flex justify-between">
                      <div className="flex">
                        <img className="p-2 aspect-w-1 aspect-h-1 w-40 h-40" href="#" src={product.image} alt={product.name}></img>
                        <div className="flex flex-col m-0">
                          <h5 className="mb-2 text-xl mt-4 font-bold leading-tight text-black">{product.name}</h5>
                          <p className="mb-4 text-base text-slate-500 font-medium ">{product.category}</p>
                          <p className="mt-4 mb-0 text-start text-lg text-black font-medium">
                            {`Rp ${product.price.toLocaleString('id-ID')} / ${product.unit}`}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="self-end  text-black rounded bg-primary px-6 pb-2 pt-2.5 text-4xl font-extrabold uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] "
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        onClick={() => handleProductDetails(product._id)}>
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Modal Checkout */}
          {isCheckoutModalVisible && (
            <div>
              {productDetails ? (
                <div className=' text-black card block rounded-lg bg-custom-F2F2F2 p-1 m-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.8),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-full'>
                  <p className='ml-4 mt-8 text-2xl font-bold'> Produk Yang Dipilih</p>
                  <div className=' text-black card block rounded-lg bg-custom-F2F2F2 p-1 mx-4 mb-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.8),0_10px_20px_-2px_rgba(0,0,0,0.04)]'>
                    <div className="flex justify-between">
                      <div className="flex">
                        <img className="p-2 aspect-w-1 aspect-h-1 w-40 h-40" href="#" src={productDetails.image} alt={productDetails.name}></img>
                        <div className="flex flex-col m-0">
                          <h5 className="mb-2 text-xl mt-4 font-bold leading-tight">{productDetails.name}</h5>
                          <p className="mb-4 text-base text-slate-500 font-medium ">{productDetails.category}</p>
                          <p className="mt-4 mb-0 text-start text-lg font-medium">
                            {`Rp${productDetails.price.toLocaleString('id-ID')} / ${productDetails.unit}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='ml-2 '>
                    <p className=' ml-4 mt-8 text-2xl font-bold'> Kuantitas Pesanan </p>
                    <div className='flex'>
                      <div className=' flex card rounded-lg bg-slate-30  p-1 ml-4 mb-4 w-fit shadow-[0_2px_15px_-3px_rgba(0,0,0,0.8),0_10px_20px_-2px_rgba(0,0,0,0.04)] '>
                        <input type="number" id='kuantitas' step={1} min={1} max={1000}
                          className=' border-spacing-4 p-2 m-1 rounded-xl w-20' onChange={(e) => { setSelectedProductQuantity(e.target.value) }} />
                        <p className='mt-3 mb-0 text-start text-lg font-medium mr-2 w-fit'>{productDetails.unit} </p>
                      </div>
                      <div>
                        <a href={`/checkout/${productDetails._id}?qty=${selectedProductQuantity}`}>
                          <button className=' text-white text-lg bg-custom-92B150 w-36 self-end h-10 rounded-lg my-5 ml-36' >
                            Checkout
                          </button>

                        </a>
                      </div>
                      <button className=' bg-red-500 w-36 h-10 rounded-lg my-5 text-lg text-white ml-2'
                        onClick={() => handleCloseCheckoutModal()}>cancel</button>
                    </div>
                  </div>

                </div>
              ) : (
                <p className=' text-black'>Loading product details...</p>
              )}
            </div>
          )}


          <div className="col-span-1 pl-12 pt-4">
            {/* Card untuk kategori dan pencarian */}
            <div className="card block rounded-lg bg-custom-F2F2F2 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-full">
              <h2 className="text-xl font-bold mb-2 text-stone-950 ">Cari Produk</h2>
              <form className='flex' onSubmit={handleSearch}>
                <input type="text" id='search' placeholder="Cari produk..." className="w-full p-2 rounded-md border text-black border-gray-300" value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="bg-primary text-lime-900 py-2 px-4 rounded-md">Cari</button>
              </form>


              <h2 className="text-xl font-bold mt-7 text-stone-950">Kategori</h2>
              <div className=' text-black'>
                <p>Bibit Tanaman</p>
                <p>Bahan Pokok </p>
                <p>Rempah-rempah</p>
                <p>Buah-buahan</p>
                <p>Sayur-sayuran</p>
              </div>
            </div>
          </div>
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

async function fetchData() {
  const response = await fetch('https://52.221.249.20:8080/api/products');
  const data = await response.json();

  return data.data;
}
