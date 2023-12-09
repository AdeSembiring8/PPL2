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


                    {/* <div class="space-y-2">
                        {/* <!-- Button trigger vertically centered modal--> 
                        <button
                            type="button"
                            class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            data-te-toggle="modal"
                            data-te-target="#exampleModalCenter"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            Vertically centered modal
                        </button>

                    </div> */}

                    {/* <!--Verically centered modal-->
                    <div
                        data-te-modal-init
                        class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                        id="exampleModalCenter"
                        tabindex="-1"
                        aria-labelledby="exampleModalCenterTitle"
                        aria-modal="true"
                        role="dialog">
                        <div
                            data-te-modal-dialog-ref
                            class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
                            <div
                                class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                                <div
                                    class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                    
                                    <h5
                                        class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                                        id="exampleModalCenterTitle">
                                        Modal title
                                    </h5>
                                    {/* <!--Close button--> 
                                    <button
                                        type="button"
                                        class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                        data-te-modal-dismiss
                                        aria-label="Close">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="h-6 w-6">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* <!--Modal body--> 
                                <div class="relative p-4">
                                    <p>This is a vertically centered modal.</p>
                                </div>

                                {/* <!--Modal footer--> 
                                <div
                                    class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                    <button
                                        type="button"
                                        class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                        data-te-modal-dismiss
                                        data-te-ripple-init
                                        data-te-ripple-color="light">
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        class="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        data-te-ripple-init
                                        data-te-ripple-color="light">
                                        Save changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> */}


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
