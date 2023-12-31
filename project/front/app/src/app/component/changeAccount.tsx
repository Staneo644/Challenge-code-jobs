import { get } from "http";
import React, { use, useState } from "react";
import { getEmployer } from "../communication/employer";
import { getJobSeeker } from "../communication/jobSeeker";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { updateUser } from "../communication/user";
import validator from "validator";

export default function ChangeAccount(is_employer: boolean) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [errorIncomplet, setErrorIncomplet] = useState(false);

  const [updateEmail, setUpdateEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorFormatEmail, setErrorFormatEmail] = useState(false);
  const [changeSuccess, setChangeSuccess] = useState(false);
  //const [changeFail, setChangeFail] = useState(false);

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    setEmail(searchParams.get("email") ?? "null");
  }, []);

  const getData = async () => {
    if (is_employer) {
      const response = await getEmployer(email).then((response) => {
        if (response) {
          setName(response.name);
          setSurname(response.surname);
        }
      });
    } else {
      const response = await getJobSeeker(email).then((response) => {
        if (response) {
          setName(response.name);
          setSurname(response.surname);
        }
      });
    }
  };

  const removeUseState = () => {
    setErrorEmail(false);
    setErrorFormatEmail(false);
    setErrorIncomplet(false);
    setChangeSuccess(false);
  };

  const updateData = async (event: any) => {
    event.preventDefault();
    if (!updateEmail || !name || !surname) {
      removeUseState();
      setErrorIncomplet(true);
      return;
    }
    if (validator.isEmail(updateEmail) === false) {
      removeUseState();
      setErrorFormatEmail(true);
      return;
    }

    const response = await updateUser(email, {
      email: updateEmail,
      name: name,
      surname: surname,
    }).then((response) => {
      if (response === true) {
        removeUseState();
        setChangeSuccess(true);
      } else {
        removeUseState();
        setErrorEmail(true);
      }
    });
  };

  useEffect(() => {
    if (email !== "") {
      getData();
      setUpdateEmail(email);
    }
  }, [email]);

  return (
    <div className="mx-auto max-w-md p-6 bg-white rounded-3xl shadow-lg">
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Adresse email
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={updateEmail}
              onChange={(e) => setUpdateEmail(e.target.value)}
              autoComplete="email"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent placeholder-gray-400 text-gray-900"
            />
          </div>
          {errorFormatEmail && (
            <p className="text-sm text-red-500">
              L&apos;email n&apos;est pas au bon format
            </p>
          )}
          {errorEmail && (
            <p className="text-sm text-red-500">L&apos;email existe déjà</p>
          )}
        </div>

        <div>
          <label
            htmlFor="surname"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Nom
          </label>
          <div className="mt-2">
            <input
              id="surname"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              autoComplete="surname"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent placeholder-gray-400 text-gray-900"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Prénom
          </label>
          <div className="mt-2">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent placeholder-gray-400 text-gray-900"
            />
          </div>
        </div>

        {errorIncomplet && (
          <p className="text-sm text-red-500">
            Veuillez remplir tous les champs
          </p>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => {
            updateData(e);
          }}
        >
          Changer
        </button>
        {changeSuccess && (
          <p className="text-sm text-green-500">Changement effectué</p>
        )}
      </form>
    </div>
  );
}
