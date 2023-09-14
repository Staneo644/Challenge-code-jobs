'use client';

import React from 'react';
import {Template} from '@/app/component/header';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import '../../../globals.css'
import { JobListFunction } from './card';
import { get } from 'http';
import { createJob, getEmployerJobs } from '@/app/communication/employer';
import { jobData, jobDataId } from '@/app/communication/global';


export default function Home() {

    const [jobList, setJobList] = useState<jobDataId[]>([])
    const pathname = usePathname()
    const searchParams = useSearchParams()  
    const [email, setEmail] = useState('')

    useEffect(() => {
      if (email === '') {
        return
      }
      createJob(email, {
        name: "test",
        employer_email: email,
        description: "test",
        money: 12,
        image: "test",
        status: "actif",
        enterprise_name: "test",
        date: "test",
      }).then((data) => {
        console.log(data);
      });
    
      getEmployerJobs(email).then((data) => {
        console.log(data);
        setJobList(data ?? []);
      });
    
    
    }, [email])


  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    console.log(url)
    console.log(searchParams.get('email'))
    if (searchParams.get('email') === null) {
      window.location.href = 'http://localhost:8080'
    }
    setEmail(searchParams.get('email') ?? 'null')
    console.log(searchParams.get('email') ?? 'null')
    
    
    
  }, [pathname, searchParams, email])

  const handleItemClick = (id: string) => {
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
    