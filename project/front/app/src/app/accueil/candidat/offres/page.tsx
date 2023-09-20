'use client';

import React, { use } from 'react';
import {Template} from '@/app/component/header';
import '../../../globals.css'
import ChangeAccount from '@/app/component/ChangeAccount';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { type } from 'os';

const Button = ( onClick:()=>void, type: boolean ) => {
    const buttonClasses = {
      accept: 'bg-green-500',
      reject: 'bg-red-500',
    };
  
    return (
      <button
        className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${buttonClasses[ type ? 'accept' : 'reject']}`}
        onClick={onClick}
      >
        {type === true ? '✔' : '✘'}
      </button>
    );
  };
  

export default function Home() {
    const [email, setEmail] = useState('');
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const reject = () => {
        console.log("rejected")
    }

    const accept = () => {
        console.log("accepted")
    }


    useEffect(() => {
        setEmail(searchParams.get('email') ?? 'null')
    }, [pathname, searchParams])
 
    return(
      <div className='h-full w-full bg-gray-100'>

        <main className="flex flex-col h-screen">
        <Template>
        return (
    <div className="bg-white p-4 rounded-lg shadow-md">
   
      <div className="mb-4">
       
      </div>
      <div className="flex justify-between">
      <div className="flex">
        .
      </div>
      <button
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white bg-green-500 text-[45px]`}
        onClick={accept}
      >
         ✔
      </button>
      <button
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white bg-red-500 text-[45px]`}
        onClick={reject}
      >
         ✘
      </button>
      <div className="flex">
        .
      </div>
    </div>
    </div>
        </Template>
        
      </main>
      </div>
  
    )
  }