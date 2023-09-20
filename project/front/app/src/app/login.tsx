import { useState } from "react";
import Link from "next/link";
import { userParam } from "./communication/user";
import { userEnum } from "./communication/global";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function Login () {

  const [email, setEmail] = useState('');
  const [unValidEmail, setUnValidEmail] = useState(false);
  const router = useRouter();

  const connect = (event:any) => {
    event.preventDefault();
    userParam(email).then((data) => {
      console.log(data)
      if (data === userEnum.isEmployer) {
        router.push('/accueil/recruteur?email='+email)
      }
      else if (data === userEnum.isJobSeeker) {
        router.push('/accueil/candidat?email='+email)
      }
      else
        setUnValidEmail(true)
    })
  }

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            width={200}
            height={200}
            className="mx-auto h-20 w-auto sm:h-32 rounded-xl"
            src="/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Connection au compte
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Adresse email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
                {unValidEmail && 
                  <div className="mt-2 text-sm text-red-600" id="email-error">
                    Adresse email pas reconnue
                  </div>
                }
            </div>


            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={connect}
              >
                Connection
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Pas inscrit ?{' '}
            <Link href="/inscription" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Inscrit-toi dés maintenant
            </Link>
          </p>
        </div>
      </div>
    </>
    )
}