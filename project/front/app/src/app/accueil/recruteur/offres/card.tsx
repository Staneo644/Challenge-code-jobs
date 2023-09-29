import React, { use, useContext } from "react";
import { statusJob, jobDataId } from "@/app/communication/global";
import { useState } from "react";
import { MyContext } from "./page";
import { createContext } from "react";
import { updateJob, createJob } from "@/app/communication/jobs";
import Dropzone from "react-dropzone";
import { DropzoneOptions } from "react-dropzone";
import { useEffect } from "react";
import Image from "next/image";

interface cardJobsProps {
  valueCard: jobDataId | undefined;
  setShowCardJobs: () => void;
  showCardJobs: boolean;
}

export const MyContextCard = createContext<cardJobsProps>({
  valueCard: undefined,
  setShowCardJobs: () => {},
  showCardJobs: true,
});

export function JobListFunction() {
  const [valueCard, setValueCard] = useState<jobDataId | undefined>(undefined);
  const email = useContext(MyContext).email;
  const reload = useContext(MyContext).reload;
  let jobData: statusJob = { status: "actif" };
  const [showCardJobs, setShowCardJobs] = useState(false);
  const jobList = useContext(MyContext).data;
  const [name, setName] = useState(valueCard?.name ?? "");
  const [money, setMoney] = useState(valueCard?.money ?? 0);
  const [description, setDescription] = useState(
    valueCard?.description ?? "",
    );
  const [completeField, setCompleteField] = useState(false);
    
    const [imagePreview, setImagePreview] = useState(valueCard?.imageBuffer);
    const [isLoading, setIsLoading] = useState(false);
    
    const closeCard = (): void => {
      console.log("closeCard");
      setShowCardJobs(false);
    };
  const convertStatus = (dataStatus: string) => {
    console.log("dataStatus : " + dataStatus);
    if (dataStatus === "expire") jobData.status = "expire";
    else if (dataStatus === "a venir") jobData.status = "a venir";
    else jobData.status = "actif";
  };

  const remove = () => {
    setDescription("");
    setCompleteField(false);
    setName("");
    setMoney(0);
    setImagePreview(undefined);
    convertStatus("actif");
  }


  useEffect(() => {
    if (valueCard === undefined) {
      remove();
      return;
    }
  
    setImagePreview(valueCard.imageBuffer);
    setName(valueCard.name);
    setMoney(valueCard.money);
    
    setDescription(valueCard.description);
    convertStatus(valueCard.status);

  }, [valueCard]);


  const handleDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }, 2000);
  };

  const handleMoneyInput = (e: any) => {
    if (
      e.key === "." ||
      isNaN(Number(e.key)) ||
      e.key === "e" ||
      e.key === "E" ||
      (e.key === "-" && e.target.selectionStart !== 0)
    ) {
      e.preventDefault();
    }
  };

  const dropzoneOptions: DropzoneOptions = {
    accept: { "image/*": [".jpg", ".jpeg", ".png"] },
    onDrop: handleDrop,
  };

  const loadButton = () => {
    if (!imagePreview || name === "" || description === "" || money === 0) {
      setCompleteField(true);
      return;
    }
    setCompleteField(false);
    if (valueCard === undefined) {
      console.log("name : " + name + "titre");
      createJob(email, {
        name: name,
        description: description,
        interested_jobseekers: [],
        money: money,
        
        imageBuffer: imagePreview,
        status: jobData.status,
      }).then((data) => {
        if (data === true) {
          reload();
          closeCard();
        }
      });
    } else {
      updateJob(Number(valueCard.id), {
        name: name,
        description: description,
        money: money,
        interested_jobseekers: valueCard.interested_jobseekers,
    
        imageBuffer: imagePreview,
        status: jobData.status,
      }).then((data) => {
        if (data === true) {
          reload();
          closeCard();
        }
      });
    }
    setImagePreview(undefined);
  };

  console.log(jobList);
  return (
    <div>
      <div className="bg-white relative h-[calc(85vh-148px)] overflow-auto">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {Array.isArray(jobList) &&
              jobList.map((job) => (
                <a key={job.id} className="group">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    {
                      <Image
                        width={200}
                        height={200}
                        alt="job image"
                        onClick={() => {
                          setValueCard(job);
                          setShowCardJobs(true);
                        }}
                        src={job.imageBuffer.toString()}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    }
                  </div>
                  <h3 className="mt-1 text-lg font-medium text-gray-900">
                    {job.name}
                  </h3>
                  <p className="mt-4 text-sm text-gray-700">
                    {job.money} € / mois
                  </p>
                  <p className="mt-4 text-sm text-gray-700">{job.status}</p>
                  <p className="mt-4 text-sm text-gray-700">
                    {job.description}
                  </p>
                </a>
              ))}
            <a className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 border-dotted border-4 border-black">
                {
                  <Image
                    width={200}
                    height={200}
                    alt="créer un nouveau job"
                    onClick={() => {
                      setValueCard(undefined), setShowCardJobs(true);
                    }}
                    src={"/plus-illustration.webp"}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                }
              </div>
            </a>
          </div>
        </div>
      </div>
      <MyContextCard.Provider
        value={{
          valueCard: valueCard,
          setShowCardJobs: closeCard,
          showCardJobs: showCardJobs,
        }}
      >
        {showCardJobs && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-70 overflow-y-auto p-6 flex items-center justify-center">
            <div className="bg-white max-w-md rounded-lg shadow-lg p-6 text-black">
              <h2 className="text-2xl font-semibold mb-4">
                {valueCard === undefined && (
                  <>Faites une nouvelle offre d&apos;emploi</>
                )}
                {valueCard !== undefined && <>Modifiez l&apos;offre</>}
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name">Titre :</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    id="name"
                    value={name}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="money" className="block text-gray-800">
                    Salaire mensuel en euro :
                  </label>
                  <input
                    id="money"
                    {...(valueCard !== undefined && {
                      defaultValue: valueCard.money,
                    })}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    onKeyDown={handleMoneyInput}
                    onChange={(e) => {
                      setMoney(Number(e.target.value));
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="status" className="block text-gray-800">
                    Status :
                  </label>
                  <select
                    id="status"
                    onChange={(e) => {
                      convertStatus(e.target.value);
                    }}
                    {...(valueCard !== undefined && {
                      defaultValue: valueCard.status,
                    })}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  >
                    <option value="active">Actif</option>
                    <option value="expire">Expiré</option>
                    <option value="a venir">À venir</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="description" className="block text-gray-800">
                    Description :
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    rows={4}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>
                <div>
                  <Dropzone {...dropzoneOptions}>
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        className="p-6 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-100"
                      >
                        <input {...getInputProps()} />
                        {isLoading ? (
                          <div className="text-gray-600">
                            <p className="text-lg">Uploading...</p>
                          </div>
                        ) : imagePreview ? (
                          <Image
                            src={imagePreview}
                            alt="Uploaded"
                            className="w-32 h-32 rounded-lg"
                            width={32 * 4}
                            height={32 * 4}
                          />
                        ) : (
                          <div className="text-gray-600 flex flex-col items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-12 h-12 mr-3 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                            <p className="text-lg">Mettez l&apos;image ici</p>
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>
              {
                completeField && (
                  <div className="text-red-500 text-sm">
                    Veuillez remplir tous les champs
                  </div>
                )
              }
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => {
                    closeCard();
                  }}
                >
                  Annuler
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => {loadButton();}}
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}
      </MyContextCard.Provider>
    </div>
  );
}
