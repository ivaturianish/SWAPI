// Characters.jsx
import React, { useState, useEffect } from 'react';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('http://localhost:27017/api/characters.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p>Loading characters...</p>;
  if (error) return <p>Error loading characters: {error.message}</p>;

  return (
    <div>
      <h1>Characters</h1>
      <ul>
        {characters.map(character => (
          <li key={character.id}>
            <span>{character.name}</span>
            <button onClick={() => alert(`Character: ${character.name}`)}>Show Name</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Characters;
