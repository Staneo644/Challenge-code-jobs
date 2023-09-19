import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'
import '../globals.css'
import DestroyCard from './headerDeleteCard'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { userParam } from '../communication/user'

const imageProfil = 'https://s2.qwant.com/thumbr/0x380/e/d/de00606904e6cfffb72b93625574e7f6d55c8b345140aea0c94ae4e4e727c0/vector-sign-of-user-icon.jpg?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F574%2F512%2Foriginal%2Fvector-sign-of-user-icon.jpg&q=0&b=1&p=0&a=0'
const navigationEmployer = [
  { name: 'Accueil', link: '/recruteur', current: true },
  { name: 'Mes offres', link: '/recruteur/offres', current: false },
  { name: 'Interessés', link: '/recruteur/interesse', current: false },
  { name: 'Mon Compte', link: '/recruteur/compte', current: false },
  { name: 'Mon entreprise', link: '/recruteur/entreprise', current: false },
]

const navigationJobSeeker = [
  { name: 'Accueil', link: '/candidat', current: true},
  { name: 'Offres', link: '/candidat/offres', current: false },
  { name: 'Mon Compte', link: '/candidat/compte', current: false },]

const userNavigation = [
  { name: 'Déconnection' },
  { name: 'Supprimer le compte' },
]

function classNames(classes:any[]) {
  return classes.filter(Boolean).join(' ')
}

interface TemplateProps {
    
    children: ReactNode;
  }
  
export const Template: React.FC<TemplateProps> = ({ children }) => {
  const [destroyCardVisible, setDestroyCardVisible] = useState(false);
  const [email, setEmail] = useState<string | null>();
  const [navigation, setNavigation] = useState(navigationEmployer);
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    console.log(url)
    console.log(pathname)
    setEmail(searchParams.get('email'));
    if (pathname === '/accueil/recruteur') {
      setNavigation(navigationEmployer);
    }
    else if (pathname.startsWith('/accueil/candidat') === true ) {
      setNavigation(navigationJobSeeker);
    }
    userParam(searchParams.get('email')??'null').then((data) => {
      if (!(data === 'isEmployer' && navigationEmployer === navigation || data === 'isJobSeeker' && navigationJobSeeker === navigation)) {
        router.push('/')
      }
    });
  }, [pathname, searchParams])
    return (
    <>
    {/*
      This example requires updating your template:
      ```
      <html class="h-full bg-gray-100">
      <body class="h-full">
      ```
    */}
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800 static">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="/logo.png"
                      alt="logo"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          onClick={() => {router.push('/accueil/' + item.link + '?email=' + searchParams.get('email'))}}
                          className={classNames([
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium']
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src={imageProfil} alt="" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                onClick={() => { if (item.name === 'Supprimer le compte') {
                                  setDestroyCardVisible(true);
                                }
                              else router.push('/')}}
                                  className={classNames([
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700']
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    onClick={() => {if (!item.current) router.push(('/accueil/' + item.link + '?email=' + searchParams.get('email')))}}
                    className={classNames([
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium']
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={imageProfil} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{email}</div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                    onClick={() => { if (item.name === 'Supprimer le compte') {
                      setDestroyCardVisible(true);
                    }
                  else router.push('/')}}
                      
                    key={item.name}
                    as="a"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <header className="bg-white shadow static">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {
            destroyCardVisible &&
            <DestroyCard onClose={() => setDestroyCardVisible(false)}/>
          }
          {children}
        </div>
      </main>
    </div>
  </>
  )
}
