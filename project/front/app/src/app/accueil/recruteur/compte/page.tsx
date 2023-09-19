'use client';

import React, { use } from 'react';
import {Template} from '@/app/component/header';
import '../../../globals.css'
import changeAccount from '@/app/component/changeAccount';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {

  
 
    return(
      <div className='h-full w-full bg-gray-100'>

        <main className="flex flex-col h-screen">
        <Template>
        {changeAccount(true)}
        </Template>
        
      </main>
      </div>
  
    )
  }