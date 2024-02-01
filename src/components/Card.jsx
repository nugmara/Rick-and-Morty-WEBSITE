import { useEffect } from "react";
import { useState } from "react";

function Card() {
  const [characters, setCharacters] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  
  useEffect(() => {
    // Fetch initial page
      fetchCharacters(currentPage)
  }, [currentPage]);

  const fetchCharacters = async (page) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );
      if (!response.ok) {
        throw new Error("Network response was not okay");
      }

      const data = await response.json();
      console.log("Received data:", data)
      if (page > data.info.pages) {
        // No more characters to fetch
        return;
      }
      const newCharacters = new Set([...characters])
      data.results.forEach((character) => newCharacters.add(character))
      setCharacters(Array.from(newCharacters))
      setTotalPages(data.info.pages)

    } catch (error) {
      console.log("Error fetching characters:", error);
    }
  };
  const loadMoreCharacters = () => {
    // Ignore if all data has been loaded
    if (currentPage >= totalPages) return;

    const nextPage = currentPage + 1;
    fetchCharacters(nextPage);
    setCurrentPage(nextPage);
  };
  return (
    <header className="bg-zing-900">
      <section className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 justify-center sm:mx-16 md:mx-36 bg-zinc-900">
        {Array.from(characters).map((character) => (
          <div
            key={character.id}
            className="flex items-stretch mt-8 mb-6 rounded-lg shadow md:max-w-xl border-gray-700 bg-zinc-800"
          >
            <img
              src={character.image}
              alt="character-image"
              className="object-cover w-full rounded-lg h-full md:h-auto md:w-56 md:rounded-none md:rounded-l-lg"
            />
            <div className="flex flex-col p-4 leading normal align-top">
              <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {character.name}
              </h4>
              <div className="flex mb-1 font-bold text-white dark:text-gray-400">
                <p>
                  {character.status === "Alive"
                    ? "🟢Alive"
                    : character.status === "Dead"
                    ? "🔴Dead"
                    : "⚪Unknown"}
                </p>
                <span className="mx-1">-</span>
                <p>{character.species}</p>
              </div>
              <div className="flex">
                <div className="w-1/2 p-4">
                  <div className="flex flex-col">
                    <p className="mb-1 text-white dark:text-gray-400">Type:</p>
                    <p className="text-white">
                      {character.type === "" ? "Unknown" : character.type}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="mb-1 text-white dark:text-gray-400">Gender:</p>
                    <p>{character.gender}</p>
                  </div>
                </div>
                <div className="w-1/2 p-4">
                  <div className="flex flex-col">
                    <p className="mb-1 text-white dark:text-gray-400">Origin:</p>
                    <p className="text-white">{character.name}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="mb-1 text-white dark:text-gray-400">Location:</p>
                    <p className="text-white">{character.location.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      {totalPages && currentPage < totalPages && (
        <button onClick={loadMoreCharacters}>
          <img src="../../MortyAnimation.gif" alt="Morty-Animation" width="80px" className="mt-2 p-4 mb-0 hover:border hover:rounded-md hover:bg-zinc-700"/>
        </button>
      )}
    </header>
    
  );
}

export default Card;

