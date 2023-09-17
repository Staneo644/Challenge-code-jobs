'use client';

import React from 'react';
import {Template} from '@/app/component/header';
import { useEffect, useState, useContext } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import '../../../globals.css'
import { JobListFunction } from './card';
import { get } from 'http';
import { createJob, getEmployerJobs } from '@/app/communication/employer';
import { jobData, jobDataId } from '@/app/communication/global';
import { createContext } from 'react';

interface createJobsProps {
  data: jobDataId[];
  reload: () => void;
  email:string;
}

export const MyContext = createContext<createJobsProps>({} as createJobsProps);

export default function Home() {

    const [jobList, setJobList] = useState<jobDataId[]>([])
    const pathname = usePathname()
    const searchParams = useSearchParams()  
    const [email, setEmail] = useState('')
    
    
    const getJobsList = ():void => {
      getEmployerJobs(email).then((data) => {
        console.log(data);
        setJobList(data ?? []);
        
      });
    }


    useEffect(() => {
      if (email === '') {
        return
      }
      
      getJobsList()
      
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
      
      
      
    }, [pathname, searchParams])
    
 
    return(
      <div className='h-full w-full bg-gray-100'>

        <main className="flex flex-col h-screen">
        <Template>
        <MyContext.Provider value={{
          data: jobList,
          reload: getJobsList,
          email: email

        }}>
        {email !== '' && <JobListFunction/> }
        </MyContext.Provider>
        </Template>
        
      </main>
      </div>
  
    )
  }
    
