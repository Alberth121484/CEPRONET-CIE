// Card.jsx
import React from 'react';


const Card = ({ title, text, image }) => {
  return (
    <div className="rounded-xl shadow-xl p-4 m-2 transition-transform transform-gpu duration-300 hover:scale-110 bg-white">
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2 uppercase">{title}</h2>
        <img className="w-18 h-16" src={image} alt="Card" />
        <p className="text-gray-600 mb-4 text-center">{text}</p>
      </div>
    </div>
  );
};

export default Card;
