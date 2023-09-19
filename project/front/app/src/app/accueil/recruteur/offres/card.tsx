import React, { useContext } from "react";
import { statusJob, jobDataId } from "@/app/communication/global";
import { useState } from "react";
import { MyContext } from "./page";
import { createContext } from "react";
import { updateJob } from "@/app/communication/jobs";
import { createJob } from "@/app/communication/employer";
import Dropzone from 'react-dropzone';

interface cardJobsProps {
  valueCard: jobDataId | undefined;
  setShowCardJobs: () => void;
  showCardJobs: boolean;
}

export const MyContextCard = createContext<cardJobsProps>(
  {
    valueCard: undefined,
    setShowCardJobs: () => {},
    showCardJobs: true,
  }
);


export function JobListFunction  () {

  const [valueCard, setValueCard] = useState<jobDataId | undefined>(undefined);
  const email = useContext(MyContext).email;
  const reload = useContext(MyContext).reload;
  let jobData: statusJob = {status: 'actif'};
  const [showCardJobs, setShowCardJobs] = useState(false);
  const closeCard = ():void => {
    console.log("closeCard")
    setShowCardJobs(false);
  };
  const jobList = useContext(MyContext).data;

  const convertStatus = (dataStatus: string) => {
    console.log("dataStatus : " + dataStatus);
    if (dataStatus === 'expire')
      jobData.status = 'expire';
    else if (dataStatus === 'a venir')
      jobData.status = 'a venir';
    else
      jobData.status = 'actif';
  }

  let name:string = valueCard?.name??"titre";
  let money:number = 0;
  let description:string = "description";
  //const [putImage, setPutImage] = useState<File>();

  const [putImage, setImageBuffer] = useState<Blob>();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [imageType, setImageType] = useState("");


  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleDrop = (acceptedFiles:any) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
    setIsLoading(true);
    setImageType(file.type);
    console.log(file);
    setTimeout(() => {
      setIsLoading(false);
      const reader = new FileReader();
      reader.onload = (e:any) => {
        console.log(e.target.result);
        setImagePreview(e.target.result);
        setImageBuffer(new Blob([e.target.result], { type: file.type }));
      };
      reader.readAsDataURL(file);
    }, 2000);
  };

  
  const handleMoneyInput = (e:any) => {

    if (
      e.key === '.' || 
      isNaN(Number(e.key)) || 
      e.key === 'e' || 
      e.key === 'E' || 
      (e.key === '-' && e.target.selectionStart !== 0)
    ) {
      e.preventDefault();
    }
  };

  const loadButton = () => {
    if (!uploadedFile || !imagePreview || !putImage) {
      return;
    }
    if (valueCard===undefined) {
      console.log("name : " + name + "titre");
      // const formData = new FormData();
      // formData.append('name', name);
      // formData.append('employer_email', email);
      // formData.append('file', uploadedFile);
      // formData.append('money', money.toString());
      // formData.append('description', description);
      // formData.append('status', jobData.status);
      createJob(email, {
        name: name,
        employer_email: email,
        description: description,
        money: money,
        imageType: imageType,
        imageBuffer: imagePreview,
        status: jobData.status
      }).then((data) => {
        console.log(data);
        reload();
        closeCard();
      });
    }
    else {
      updateJob(valueCard._id, {
        name: name,
        employer_email: email,
        description: description,
        money: money,
        imageType: imageType,
        imageBuffer: imagePreview,
        status: jobData.status
      }).then((data) => {
        console.log(data);
        reload();
        closeCard();
      }
      );
    }
  }


    console.log(jobList);
    return (
      <div>
      <div className="bg-white relative h-[calc(85vh-148px)] overflow-auto">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {jobList.map((job) => (
            <a key={job._id} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                { <img
                  onClick={() => {setValueCard(job); setShowCardJobs(true)}}
                  src={job.imageBuffer.toString()}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                  /> }
              </div>
              <h3 className="mt-1 text-lg font-medium text-gray-900">{job.name}</h3>
              <p className="mt-4 text-sm text-gray-700">{job.money} € / mois</p>
              <p className="mt-4 text-sm text-gray-700">{job.status}</p>
              <p className="mt-4 text-sm text-gray-700">{job.description}</p>

            </a>
          ))}
          <a className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 border-dotted border-4 border-black">
                { <img
                  onClick={() => {setValueCard(undefined), setShowCardJobs(true)}}
                  src={'https://s2.qwant.com/thumbr/0x380/5/8/9e5c051a7937df5eb288ca1c4d420cfb7219b79498a54e4f52239a361f2309/plus-icon-vector-illustration.jpg?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F582%2F052%2Foriginal%2Fplus-icon-vector-illustration.jpg&q=0&b=1&p=0&a=0'}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                /> }
              </div>
            </a>

        </div>
      </div>
    </div>
    <MyContextCard.Provider value={{valueCard : valueCard, setShowCardJobs : closeCard, showCardJobs: showCardJobs}}>





 { showCardJobs &&
      <div className="fixed inset-0 bg-gray-900 bg-opacity-70 overflow-y-auto p-6 flex items-center justify-center">
      <div className="bg-white max-w-md rounded-lg shadow-lg p-6 text-black">
      <h2 className="text-2xl font-semibold mb-4">
      {valueCard===undefined && <>Faites une nouvelle offre d'emploi</>}
      {valueCard!==undefined && <>Modifiez l'offre</>}
      </h2>
      <div className="space-y-4">
      <div>
      <label htmlFor="name">Titre :</label>
      <input
      type="text"
      onChange={(e) => {name = e.target.value}}
      id="name"
      {...(valueCard!==undefined && {defaultValue: valueCard.name})}
      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
      />
      </div>
      <div>
      <label htmlFor="money" className="block text-gray-800">Salaire mensuel en euro :</label>
      <input
      id="money"
      {...(valueCard!==undefined && {defaultValue: valueCard.money})}
      
      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
      onKeyDown={handleMoneyInput}
      onChange={(e) => {money = Number(e.target.value)}}
      />
      </div>
      <div>
      <label htmlFor="status" className="block text-gray-800">Status :</label>
      <select
      id="status"
      onChange={(e) => {convertStatus(e.target.value)}}
      {...(valueCard!==undefined && {defaultValue: valueCard.status})}
      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
      >
      <option value="active">Actif</option>
      <option value="expire">Expiré</option>
      <option value="a venir">À venir</option>
      </select>
      </div>
      <div>
      <label htmlFor="description" className="block text-gray-800">Description :</label>
      <textarea
      id="description"
      {...(valueCard!==undefined && {defaultValue: valueCard.description})}
      rows={4}
      onChange={(e) => {description = e.target.value}}
      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
      ></textarea>
      </div>
      <div>
      <Dropzone onDrop={handleDrop} accept='image/*'>
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
            <img src={imagePreview} alt="Uploaded" className="w-32 h-32 rounded-lg" />
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
              <p className="text-lg">Mettez l'image ici</p>
            </div>
          )}
        </div>
      )}
    </Dropzone>
     
      </div>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
      <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={() => {closeCard()}}>Annuler</button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={loadButton}>Enregistrer</button>
      </div>
      </div>
      </div>
      }

    </MyContextCard.Provider>
                  </div>
    );
  }