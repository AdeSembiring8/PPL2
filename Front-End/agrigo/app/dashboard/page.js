import Image from 'next/image'

export default function page() {
  return (
    <>
      <nav class=" bg-lime-700 px-4">
        <div class="container mx-auto">
          <div class="flex items-center justify-between">
            <img href="#" src='img/logosm.png'></img>
            <div class="flex space-x-4 items-center">
              <a href="/login" className="text-white">User</a>
              <img href="#" src='img/logosm.png'></img>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex min-h-smicreen flex-col p-20 bg-white w-full h-screen bg-center bg-cover">
        <h1 className="text-black font-extrabold text-7xl mb-8">Mau belanja apa hari ini?</h1>

        <div className="grid grid-cols-3 gap-4">
          <div className="cards col-span-2 flex grid-cols-2 gap-6">
            <div className="card block rounded-lg bg-custom-F2F2F2 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-full">
              <div className="flex justify-between">
                <div className="flex">
                  <img className="pr-2 aspect-w-1 aspect-h-1 w-40 h-40" href="#" src='https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcR9HnulCAFkllQVXlFhwtgtsTHN3TSFu1x-FtRi7vYAwuLnyfSbT2N9tPeKEWhZGQww'></img>
                  <div className="flex flex-col m-0">
                    <h5
                      class="mb-2 text-xl font-bold leading-tight text-black">
                      Beras
                    </h5>
                    <p class="mb-4 text-base text-slate-500 font-medium ">
                      Bahan pokok
                    </p>
                    <p class="mt-8 mb-0 text-3xl text-black font-medium">
                      Rp12.130 / kg
                    </p>
                  </div>
                </div>
                <a href='/checkout'>
                  <button
                    type="button"
                    class="self-end text-black rounded bg-primary px-6 pb-2 pt-2.5 text-xl font-extrabold uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    +
                  </button>
                </a>
              </div>
            </div>
            <div className="card block rounded-lg bg-custom-F2F2F2 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-full">
              <div className="flex justify-between">
                <div className="flex">
                  <img className="p-2 aspect-w-1 aspect-h-1 w-40 h-40" href="#" src='https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcR9HnulCAFkllQVXlFhwtgtsTHN3TSFu1x-FtRi7vYAwuLnyfSbT2N9tPeKEWhZGQww'></img>
                  <div className="flex flex-col m-0">
                    <h5
                      class="mb-2 text-xl font-bold leading-tight text-black">
                      Bawang Merah
                    </h5>
                    <p class="mb-4 text-base text-slate-500 font-medium ">
                      Rempah-rempah
                    </p>
                    <p class="mt-4 mb-0 text-start text-lg text-black font-medium">
                      Rp20.130 / kg
                    </p>
                  </div>
                </div>
                <a href='/checkout'>
                  <button
                    type="button"
                    class="self-end text-black rounded bg-primary px-6 pb-2 pt-2.5 text-xl font-extrabold uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    +
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="search">
          <div className="card block rounded-lg bg-custom-F2F2F2 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-full">
              <div className="flex justify-between">
                <div className="flex">
                  <img className="p-2 aspect-w-1 aspect-h-1 w-40 h-40" href="#" src='https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcR9HnulCAFkllQVXlFhwtgtsTHN3TSFu1x-FtRi7vYAwuLnyfSbT2N9tPeKEWhZGQww'></img>
                  <div className="flex flex-col m-0">
                    <h5
                      class="mb-2 text-xl font-bold leading-tight text-black">
                      Search
                    </h5>
                    <p class="mb-4 text-base text-slate-500 font-medium ">
                      Bahan pokok
                    </p>
                    <p class="mt-4 mb-0 text-lg text-black font-medium self-end">
                      Rp12.130 / kg
                    </p>
                  </div>
                </div>
                <a href='/checkout'>
                  <button
                    type="button"
                    class="self-end text-black rounded bg-primary px-6 pb-2 pt-2.5 text-xl font-extrabold uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    +
                  </button>
                </a>
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
  )
}
