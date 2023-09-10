import { useState } from "react";
import Link from "next/link";


export default function Register () {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isEmployer , setIsEmployer] = useState(false);
  const [surname, setSurname] = useState('');
  const connect = () => {

    console.log("paramètres : " + email +  " " + name + " " + surname + " Employeur : " + isEmployer );
    
  }

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto sm:h-32 rounded-xl"
            src="/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Nouveau Compte
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
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Nom
              </label>
              <div className="mt-2">
                <input
                  id="surname"
                  type="surname"
                  onChange={(e) => setSurname(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Prénom
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  type="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

    <fieldset>

        <input id="draft" className="peer/draft" type="radio" name="status" required onChange={(e) => setIsEmployer(false)}/>
        <label className="text-gray-900 p-3">  En recherche d'emplois  </label>

        <input id="published" className="peer/published" type="radio" name="status" onChange={(e) => setIsEmployer(true)}/>
        <label className="text-gray-900 p-3">  Employeur  </label>

    </fieldset>


            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={connect}
              >
                Inscription
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Déjà un compte ?{' '}
            <Link href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Connecte-toi
            </Link>
          </p>
        </div>
      </div>
    </>
    )
}