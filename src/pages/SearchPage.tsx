import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DogCard from "../components/DogCard";
import api from "../utils/api";

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

const SearchPage: React.FC = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [breeds, setBreeds] = useState<string[]>([]);
    const [filters, setFilters] = useState({ breed: "", sort: "breed:asc" });
    const [favorites, setFavorites] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBreeds();
        fetchDogs();
    }, [filters, currentPage]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const fetchBreeds = async () => {
        try {
            const response = await api.get("/dogs/breeds");
            setBreeds(response.data);
        } catch (error) {
            console.error("Error fetching breeds", error);
        }
    };

    const fetchDogs = async () => {
        try {
            const response = await api.get("/dogs/search", {
                params: {
                    breeds: filters.breed ? [filters.breed] : undefined,
                    sort: filters.sort,
                    size: 25,
                    from: (currentPage - 1) * 25,
                },
            });
            const dogIds = response.data.resultIds;
            const dogsResponse = await api.post("/dogs", dogIds);
            setDogs(dogsResponse.data);
        } catch (error) {
            console.error("Error fetching dogs", error);
        }
    };

    const toggleFavorite = (dogId: string) => {
        setFavorites((prev) =>
            prev.includes(dogId) ? prev.filter((id) => id !== dogId) : [...prev, dogId]
        );
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Search Dogs</h1>
            <div className="flex gap-4 mb-4 items-center">
                <select
                    className="p-2 border rounded h-10"
                    value={filters.breed}
                    onChange={(e) => setFilters({ ...filters, breed: e.target.value })}
                >
                    <option value="">All Breeds</option>
                    {breeds.map((breed) => (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                    ))}
                </select>

                <select
                    className="p-2 border rounded h-10"
                    value={filters.sort}
                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                >
                    <option value="breed:asc">Breed (A-Z)</option>
                    <option value="breed:desc">Breed (Z-A)</option>
                </select>

                <button
                    className="px-4 py-2 bg-green-500 text-white rounded h-10 flex items-center"
                    onClick={() => navigate("/match")}
                >
                    Generate Match
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dogs.map((dog) => (
                    <DogCard
                        key={dog.id}
                        dog={dog}
                        toggleFavorite={toggleFavorite}
                        isFavorite={favorites.includes(dog.id)}
                    />
                ))}
            </div>

            <div className="flex justify-between mt-4">
                <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                    Previous
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>
        </div>

    );
};

export default SearchPage;