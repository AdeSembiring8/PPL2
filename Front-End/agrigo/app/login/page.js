import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-smicreen flex-col items-center justify-between bg-[url('/img/bg_login.png')] w-full h-screen bg-center bg-cover">
      <div className="flex w-1/3 bg-white self-end h-screen text-black flex-col">
        <img className=' pt-14 px-14 ' src='img/logo.png'></img>
        <h1 className='font-extrabold text-4xl self-center font-fredoka mt-24'>Selamat Datang!</h1>
 


        <h3 className="self-center text-sm pt-2">Silahkan masuk dengan akun anda</h3>
        
        <form className="p-50">
          <label className="">Username</label>
          <input></input>
          
        </form>
      </div>
    </main>
  )
}
