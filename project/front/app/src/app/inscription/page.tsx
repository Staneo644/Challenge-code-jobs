'use client'
import '../globals.css';
import Register from './register';


export default function Home() {

  return(
    <main className="absolute h-full w-full bg-white">

    {Register()}
    </main>
  )
}