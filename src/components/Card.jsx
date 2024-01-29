import { useEffect } from "react";
import { useState } from "react";

function Card() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  
  useEffect(() => {
    // Fetch initial page
    fetchCharacters(currentPage);
  }, []) 

  const fetchCharacters = async (page) => {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        if (!response.ok) {
            throw new Error("Network response was not okay")
        }

        const data = await response.json();
        setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
        setTotalPages(data.info.pages);
    } catch (error) {
        console.log("Error fetching characters:", error)
    }
  }
  const loadMoreCharacters = () => {
    // Ignore if all data has been loaded
    if (currentPage >= totalPages) return
    
    const nextPage = currentPage + 1;
    fetchCharacters(nextPage);
    setCurrentPage(nextPage)
}
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {characters.map((character) => (
                    <div key={character.id}>
                        <td>{character.name}</td>
                    </div>
                ))}
            </tbody>
        </table>
        {totalPages && currentPage < totalPages && (
        <button onClick={loadMoreCharacters}>Load More</button>
      )}
    </div>
  )
}

export default Card