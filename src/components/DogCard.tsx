import React from "react";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface DogCardProps {
  dog: Dog;
  toggleFavorite?: (id: string) => void;
  isFavorite?: boolean;
  hideFavoriteButton?: boolean;
}

const DogCard: React.FC<DogCardProps> = ({ dog, toggleFavorite, isFavorite, hideFavoriteButton }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img src={dog.img} alt={dog.name} className="w-full h-48 object-cover rounded-lg" />
      <h2 className="text-xl font-bold mt-2">{dog.name}</h2>
      <p>Age: {dog.age}</p>
      <p>Breed: {dog.breed}</p>
      <p>Location: {dog.zip_code}</p>
      
      {!hideFavoriteButton && toggleFavorite && (
        <button
          className={`mt-2 px-4 py-2 rounded ${isFavorite ? "bg-red-500" : "bg-blue-500"} text-white`}
          onClick={() => toggleFavorite(dog.id)}
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
      )}
    </div>
  );
};



export default DogCard;
