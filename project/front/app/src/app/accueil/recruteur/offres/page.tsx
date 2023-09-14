'use client';

import React from 'react';
import {Template} from '@/app/component/header';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import '../../../globals.css'
import { JobListFunction } from './card';
import { get } from 'http';
import { getEmployer } from '@/app/communication/employer';
import { getEmployerJobs } from '@/app/communication/jobs';
import { jobData } from '@/app/communication/global';


export default function Home() {

    const [jobList, setJobList] = useState<jobData[]>([])
    const pathname = usePathname()
    const searchParams = useSearchParams()  
    const [email, setEmail] = useState('')

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    console.log(url)
    console.log(searchParams.get('email'))
    if (searchParams.get('email') === null) {
      window.location.href = 'http://localhost:8080'
    }
    setEmail(searchParams.get('email') ?? 'null')

    getEmployerJobs(email).then((data) => {
      console.log(data);
    
      setJobList(data ?? []);
    });
    
  }, [pathname, searchParams])

  const handleItemClick = (id: number) => {
    console.log(id)
  }

    return(
        <main className="absolute h-full w-full bg-gray-100">
        <Template>

        {email !== '' && JobListFunction({jobOffers:jobList, handleItemClick:handleItemClick})}
        
        </Template>
      </main>
  
    )
  }
    