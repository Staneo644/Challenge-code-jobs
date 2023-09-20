'use client';

import React, { use } from 'react';
import {Template} from '@/app/component/header';
import '../../../globals.css'
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { type } from 'os';
import { getJobs } from '@/app/communication/jobSeeker';
import { jobDataId } from '@/app/communication/global';
import { addSeeingJob } from '@/app/communication/jobSeeker';
import Image from 'next/image';
import { addInterestedUser } from '@/app/communication/jobs';

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
    const [jobs, setJobs] = useState<jobDataId[]>()
    const [currentJobIndex, setCurrentJobIndex] = useState(0);
    const [noJobs, setNoJobs] = useState(true);
    const [actualDate, setActualDate] = useState(new Date());


    const showNextJob = () => {
      if (jobs === undefined) {
        return;
      }

      addSeeingJob(email, jobs[currentJobIndex]._id);
      if (currentJobIndex < jobs.length - 1) {


        setActualDate(new Date(jobs[currentJobIndex + 1].date));
        setCurrentJobIndex(currentJobIndex + 1);
      } else {
       setNoJobs(true);
        console.log("Vous avez vu tous les emplois disponibles.");
      }
    }

    const reject = () => {
      if (!noJobs) {
        console.log("rejected")
        showNextJob()
      }
    }

    const accept = () => {
        if (!noJobs) {
          console.log("accepted")
          showNextJob()
          if (jobs && jobs[currentJobIndex] !== undefined) 
            addInterestedUser(email, jobs[currentJobIndex]);
        }
    }




    useEffect(() => {
        setEmail(searchParams.get('email') ?? 'null')
        getJobs(searchParams.get('email') ?? 'null').then((data) => {
            console.log(data)
            setJobs(data);
            if (data.length > 0) {
              setActualDate(new Date(data[currentJobIndex].date));
            }
              
            if (data.length > 0) {
              setNoJobs(false);
            }
        })
    }, [pathname, searchParams])
 
    return (
      <div className='h-full w-full bg-gray-100'>
        <main className="flex flex-col h-screen">
          <Template>
            <div className="bg-white p-4 rounded-lg shadow-md h-[calc(85vh-148px)]  relative"> {/* Ajout de la classe relative */}
              <div className="mb-4 max-h-[calc(85vh-238px)] overflow-auto">
                {noJobs && 
                  <div className="text-2xl font-bold text-gray-800 text-center">
                    Vous avez vu tous les emplois disponibles.
                  </div>
                }
                {jobs && !noJobs &&
                  <div className='flex items-center justify-center flex-col'>
                    <div className="text-2xl font-bold text-gray-800 text-center p-4">
                      {jobs[currentJobIndex].name}
                    </div>
                    <Image src={jobs[currentJobIndex].imageBuffer.toString()} width={500} height={500} alt="job image" className="max-h-70 center object-center group-hover:opacity-75 flex" />
                    <div className="text-2xl font-bold text-gray-800 text-center p-4">
                      {jobs[currentJobIndex].money} € / mois
                    </div>
                    <div className="text-2xl font-bold text-gray-800 text-center p-4">
                      {jobs[currentJobIndex].description}
                    </div>
                    <div className="text-2xl font-bold text-gray-800 text-center p-4">
                      Status : {jobs[currentJobIndex].status}
                    </div>
                    <div className="text-2xl font-bold text-gray-800 text-center p-4">
                      entreprise {jobs[currentJobIndex].enterprise_name}
                    </div>
                    <div className="text-2xl font-bold text-gray-800 text-center p-4">
                      Posté le {actualDate.getDay() + "/" + actualDate.getMonth() + "/" + actualDate.getFullYear()}
                    </div>
                  </div>
                }
              </div>
              
              <div className="absolute bottom-4 left-0 right-4 text-center flex justify-between w-full"> {/* Ajustez la classe CSS ici */}
              .
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
                .
              </div>
            </div>
          </Template>
        </main>
      </div>
    )
  }