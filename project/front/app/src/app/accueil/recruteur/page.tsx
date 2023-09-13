'use client';

import React from 'react';
import {Template} from '@/app/component/header';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import '../../globals.css'

export default function Home() {

    const pathname = usePathname()
  const searchParams = useSearchParams()  

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    console.log(url)
    console.log(searchParams.get('email'))
  }, [pathname, searchParams])

    return(
        <main className="absolute h-full w-full bg-gray-100">
        <Template>

        <div className='bg-dark'>
            sdsdddddddddddd
            </div>yolo
        
        </Template>
      </main>
  
    )
  }
    