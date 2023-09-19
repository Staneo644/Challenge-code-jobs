'use client';

import React, { use } from 'react';
import {Template} from '@/app/component/header';
import '../../../globals.css'
import changeAccount from '@/app/component/changeAccount';

export default function Home() {
    return(
      <div className='h-full w-full bg-gray-100'>

        <main className="flex flex-col h-screen">
        <Template>
        {changeAccount(false)}
        </Template>
        
      </main>
      </div>
  
    )
  }