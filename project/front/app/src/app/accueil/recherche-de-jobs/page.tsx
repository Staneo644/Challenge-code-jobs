'use client';

import React from 'react';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Home() {

    const pathname = usePathname()
  const searchParams = useSearchParams()
 
  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    console.log(url)
    console.log(searchParams.get('email'))
  }, [pathname, searchParams])

    return(
        
        <main className="absolute h-full w-full bg-white">
  
        
      </main>
  
    )
  }
  