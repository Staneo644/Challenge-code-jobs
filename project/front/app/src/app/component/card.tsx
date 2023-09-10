import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
  }
  

  const Card: React.FC<CardProps> = ({ children }) => {
    return (
      <div className="bg-gray-300 p-6 max-w-[50%] mx-auto rounded-lg shadow-md position-absolute top-50">
        {children}
      </div>
    );
  };

  export default Card;
  