'use client';

import React, { useCallback } from 'react';
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
    
    
  
    
    
    
    useEffect(() => {
      if (email === '') {
        return
      }
    
      getEmployerJobs(email).then((data) => {
        setJobList(data ?? []);})
    }, [email])
    
    
    useEffect(() => {
      setEmail(searchParams.get('email') ?? 'null')
    }, [pathname, searchParams])
    
 
    return(
      <div className='h-full w-full bg-gray-100'>

        <main className="flex flex-col h-screen">
        <Template>
        <MyContext.Provider value={{
          data: jobList,
          reload: getJobList,
          email: email

        }}>
        {email !== '' && <JobListFunction/> }
        </MyContext.Provider>
        </Template>
        
      </main>
      </div>
  
    )
  }
    
