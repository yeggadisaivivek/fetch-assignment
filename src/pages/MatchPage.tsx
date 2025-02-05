import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import DogCard from "../components/DogCard";

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

const MatchPage: React.FC = () => {
    const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMatchedDog();
    }, []);

    const fetchMatchedDog = async () => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        if (favorites.length === 0) return;

        try {
            const matchResponse = await api.post("/dogs/match", favorites);
            const matchedDogId = matchResponse.data.match;

            if (matchedDogId) {
                const dogResponse = await api.post("/dogs", [matchedDogId]);
                setMatchedDog(dogResponse.data[0]);
            }
        } catch (error) {
            console.error("Error fetching matched dog", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold mb-4">Your Perfect Match</h1>

                {matchedDog ? (
                    <DogCard dog={matchedDog} hideFavoriteButton />
                ) : (
                    <p className="text-red-500">No match found.</p>
                )}

                <div className="mt-4 flex justify-center">
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded"
                        onClick={() => navigate("/search")}
                    >
                        Back to Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MatchPage;
