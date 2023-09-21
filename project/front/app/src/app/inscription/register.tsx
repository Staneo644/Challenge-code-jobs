import { use, useState } from "react";
import Link from "next/link";
import {createEnterprise, getEnterprise} from "../communication/enterprise";
import { EnterpriseData, userEnum } from "../communication/global";
import { createUser, userExist } from "../communication/user";
import validator from "validator";
import Image from 'next/image';
import { useRouter } from "next/navigation";


export default function Register () {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  
  const [isEmployer , setIsEmployer] = useState(false);
  const [selectedEnterprise, setSelectedEnterprise] = useState('')
  const [searchEnterprise, setSearchEnterprise] = useState(false);
  const [enterpriseName, setEnterpriseName] = useState('');
  
  const [enterpriseList, setEntrepriseList] = useState<EnterpriseData[]>  ([]);
  const [errorEnterprise, setErrorEnterprise] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorFormatEmail, setErrorFormatEmail] = useState(false);
  const [errorIncomplet, setErrorIncomplet] = useState(false);

  const connect = (event:any) => {
    event.preventDefault();
    if (!email || !name || !surname || (searchEnterprise && !enterpriseName && selectedEnterprise === '')) {
      setErrorIncomplet(true);
      return;
    }
    setErrorIncomplet(false);
    if (validator.isEmail(email) === false) {
      console.log("email format error")
      setErrorFormatEmail(true);
      setErrorEmail(false);
      return;
    }
    userExist(email).then((data) => {
      if (data === true) {
        setErrorEmail(true);
        setErrorFormatEmail(false);
        return;
      }
      
      if (searchEnterprise) {
          createEnterprise({email_patron: email, title: enterpriseName}).then((data) => {
            if (data === true) {
              createUser({email: email, name: name, surname: surname, enterprise_name: enterpriseName}).then((dataEmployer) => {
                if (dataEmployer === userEnum.isEmployer) {
                router.push('/accueil/recruteur?email='+email)
                }
                
              })
            }
            else {
              setErrorEnterprise(true);
            }
          })
        return
      }
    if (!searchEnterprise && isEmployer) {
      getEnterprise().then((data) => {
        setEntrepriseList(data)
      })
      setSearchEnterprise(true)
      return
    }

    if (!isEmployer) {
      createUser({email: email, name: name, surname: surname}).then((data) => {
        if (data === userEnum.isJobSeeker) {
          router.push('/accueil/candidat?email='+email)
          }
      })
    }
    
  })}

  const handleItemClick = (title:string) => {
    setSelectedEnterprise(title);
  };


  const handleLabelClick = () => {
    setSelectedEnterprise('');
  };

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
          {searchEnterprise && <>Choisit ton entreprise</>}
          {!searchEnterprise && <>Nouveau Compte</>}
          </h2>
          <h3>
          {searchEnterprise && selectedEnterprise !== '' && <p className=" text-center text-sm text-gray-700">Entreprise sélectionnée : {selectedEnterprise}</p>}
          </h3>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
          {!searchEnterprise && <>
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
                {errorFormatEmail && <p className="text-sm text-red-500">L&apos;email n&apos;est pas au bon format</p>}
                {errorEmail && <p className="text-sm text-red-500">L&apos;email existe déjà</p>}
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
                  <label className="text-gray-900 p-3">  En recherche d&apos;emplois  </label>

                  <input id="published" className="peer/published" type="radio" name="status" onChange={(e) => setIsEmployer(true)}/>
                  <label className="text-gray-900 p-3">  Employeur  </label>

              </fieldset>
            </> }

            {searchEnterprise && <>
              <ul role="list" className="p-6 divide-y divide-slate-200">

              
            <div className="relative h-[270px] overflow-auto">
              {enterpriseList.map((enterprise) => (
                <li
                key={enterprise.title}
                className={`flex py-4 ${selectedEnterprise === enterprise.title ? 'bg-gray-200 shadow-lg rounded-md ' : ''}`}
                onClick={() => handleItemClick(enterprise.title)}
                >
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium text-slate-900">{enterprise.title}</p>
                  <p className="text-sm text-slate-500 truncate">{enterprise.email_patron}</p>
                </div>
              </li>
              ))}
            </div>

              </ul>
              
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  L&apos;entreprise n&apos;est pas dans la liste ? Créé-là !
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    type="name"
                    onChange={(e) => {setEnterpriseName(e.target.value); handleLabelClick()}}
                    onClick={handleLabelClick}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                {errorEnterprise && <p className="text-sm text-red-500">L&apos;entreprise existe déjà</p>}
              </div>
              </>
            
            }


            <div>
              {errorIncomplet && <p className="text-sm text-red-500">Veuillez remplir tous les champs</p>}
              <button
               
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