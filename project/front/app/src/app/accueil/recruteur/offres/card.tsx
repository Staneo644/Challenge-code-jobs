import React from "react";
import { jobData } from "@/app/communication/global";

interface jobListProps {
    
    jobOffers: jobData[];
    handleItemClick: (id: number) => void;
  }

export const JobListFunction: React.FC<jobListProps> = ({ jobOffers, handleItemClick }) => {
    return (
      <div className="bg-white">
        <h2 className="text-3xl font-semibold text-gray-800">Job Offers</h2>
        <ul className="divide-y divide-gray-300">
          {jobOffers.map((job) => (
            <li
              key={job.ID}
              className="py-4 cursor-pointer hover:bg-gray-100"
              onClick={() => handleItemClick(job.ID)}
            >
              <h3 className="text-xl font-semibold text-gray-900">{job.enterprise_name}</h3>
              <p className="mt-2 text-gray-700">{job.description}</p>
              <p className="mt-2 text-gray-600">Salary: ${job.money}</p>
              <p className="mt-2 text-gray-600">Date: {job.date}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }