'use client';

import React, { ReactNode, useCallback } from 'react';
import {Template} from '@/app/component/header';
import { useEffect, useState, useContext } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import '../../../globals.css'
import { get } from 'http';
import { createJob, getEmployerJobs } from '@/app/communication/employer';
import { jobData, jobDataId, jobSeekerData } from '@/app/communication/global';
import { createContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { getJobSeeker } from '@/app/communication/jobSeeker';

interface createJobsProps {
  data: jobDataId[];
  reload: () => void;
  email:string;
}

const showOneCandidate = (job: jobDataId) => {
    const [jobSeeker, setJobSeeker] = useState<jobSeekerData[]>( Array.from({ length: job.interested_jobseekers.length }, () => ({
        email: '',
        surname: '',
        name: ''
      })));

      const updateJobSeeker = (index: number, newValue: jobSeekerData) => {
        const newArray = [...jobSeeker];
        newArray[index] = newValue;
        setJobSeeker(newArray);
      };

    useEffect(() => {
        for(let i = 0; i < job.interested_jobseekers.length; i++) {
    getJobSeeker(job.interested_jobseekers[i]).then((data) => {
        if (data)
            updateJobSeeker(i, data);
    })}
    }, [])

    return (
        <>
            <div className='flex flex-col'>
                {jobSeeker.map((candidate, index) => (
                    <div key={index} className='flex flex-row items-center bg-white shadow-md p-4 m-4 rounded-lg text-black hover:bg-gray-100 justify-between'>
                        <div className='flex'>
                            {candidate.name}
                        {candidate.surname}
                        </div>
                        <div className='flex'>
                            {candidate.email}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}


export const MyContext = createContext<createJobsProps>({} as createJobsProps);

export default function Home() {

    const [jobList, setJobList] = useState<jobDataId[]>([])
    const pathname = usePathname()
    const searchParams = useSearchParams()  
    const [email, setEmail] = useState('')
    const [showCandidates, setShowCandidates] = useState<boolean[]>()
    const [candidateParam, setCandidateParam] = useState<jobSeekerData[]>([])
    
    
    const getJobList = () => {
      getEmployerJobs(email).then((data) => {
        setJobList(data ?? []);
        setShowCandidates(new Array(data?.length ?? 0).fill(false))
      })};

    const isInCandidateParam = (email: string) => {
        for(let i = 0; i < candidateParam.length; i++) {
            if (candidateParam[i].email === email) {
                return true
            }
        }
        return false
    }

    const getCandidateParam = (email: string) => {
        for(let i = 0; i < candidateParam.length; i++) {
            if (candidateParam[i].email === email) {
                return candidateParam[i]
            }
        }
        return null
    }

    useEffect(() => {
        
        
        //   const updateJobSeeker = (firstindex: number, secondindex:number, newValue: jobSeekerData) => {
        //     if (candidateParam[firstindex] === undefined) {
        //         setCandidateParam([...candidateParam, [newValue]])
        //     }
        //     if (candidateParam[firstindex][secondindex] === undefined) {
        
        
        //     const newArray = [...candidateParam];
        //     newArray[firstindex].push(newValue);
        //     setCandidateParam(newArray);
        //     }
        if (jobList === undefined) {
            return
        }
        for(let i = 0; i < jobList.length; i++) {
            for(let j = 0; j < jobList[i].interested_jobseekers.length; j++) {
                if (isInCandidateParam(jobList[i].interested_jobseekers[j])) {
                    continue
                }
                getJobSeeker(jobList[i].interested_jobseekers[j]).then((data) => {
                    if (data) {
                        const newArray = [...candidateParam];
                        newArray.push(data);
                        setCandidateParam(newArray);
                    }
                }
            )
    
        }
    }
}, [jobList])

console.log(candidateParam)

useEffect(() => {
        
      if (email === '') {
        return
      }
      getJobList()
    }, [email])
    
    const date = (jobDate:Date) => {
        const date = new Date(jobDate);
        return (
        <>{date.getDay()}/{date.getMonth()}/{date.getFullYear()}</>)
    }

    
    useEffect(() => {
      const url = `${pathname}?${searchParams}`
      console.log(url)
      console.log(searchParams.get('email'))
      if (searchParams.get('email') === null) {
        window.location.href = 'http://localhost:8080'
      }
      setEmail(searchParams.get('email') ?? 'null')  
    }, [pathname, searchParams])
    
 
    return (
        <div className='h-full w-full bg-gray-100'>
      
          <main className="flex flex-col h-screen">
            <Template>
                <div className="flex flex-col justify-between max-h-[calc(85vh-148px)] overflow-auto">
              {jobList && showCandidates &&
                jobList.map((job, number) => (
                  <div key={number} 
                    className=" flex flex-col bg-white shadow-md p-4 m-4 rounded-lg text-black hover:bg-gray-100  "
                    onClick={() => {setShowCandidates(showCandidates.map((value, index) => index === number ? !value : value))}}>
                        <div className='cursor-pointer flex flex-row justify-between'>

                            <div className='flex'>
                                {job.name}, posté le {date(job.date)}
                            </div>
                        <span className=' flex ml-4'>
                            {job.interested_jobseekers.length} { " candidat     ."}
                            <FontAwesomeIcon icon={showCandidates[number] ? faAngleUp : faAngleDown} />
                        </span>
                        </div>
                        {showCandidates[number] &&
                        <div className='flex flex-col'>
                        {job.interested_jobseekers.map((candidate, index) => (
                            <div key={index} className='flex flex-row items-center bg-white shadow-md p-4 m-4 rounded-lg text-black hover:bg-gray-100 justify-between'>
                                <div className='flex'>
                                    {getCandidateParam(candidate)?.name}
                                    {"   "}
                                    {getCandidateParam(candidate)?.surname}
                                </div>
                                <div className='flex'>
                                    {getCandidateParam(candidate)?.email}
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                        
                        }
                      
                    </div>
                ))}
                    <div className="text-black ml-2">
                    
                  </div>
                {!jobList && <div className="text-black"> Vous n'avez pas encore créer de jobs </div>}
                </div>
            </Template>
          </main>
        </div>
      )
  }
    
