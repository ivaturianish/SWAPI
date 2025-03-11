"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFavorites } from "./FavoritesContext"

const Characters = () => {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { addFavorite, isFavorite, removeFavorite } = useFavorites()

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("http://localhost:9001/api/characters")
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        setCharacters(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [])

  const handleCharacterClick = (id) => {
    navigate(`/characters/${id}`)
  }

  const handleFavoriteClick = (e, character) => {
    e.stopPropagation()

    if (isFavorite("characters", character.id)) {
      removeFavorite("characters", character.id)
    } else {
      addFavorite("characters", character)
    }
  }

  if (loading) return <div className="loading">Loading characters...</div>
  if (error) return <div className="error">Error loading characters: {error.message}</div>

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <ul className="item-list">
        {characters.map((character) => (
          <li key={character.id} className="item-card">
            <div className="item-content" onClick={() => handleCharacterClick(character.id)}>
              <div className="item-name">{character.name}</div>
              <div>Gender: {character.gender}</div>
              <div>Birth Year: {character.birth_year}</div>
            </div>
            <button
              className={`favorite-btn ${isFavorite("characters", character.id) ? "is-favorite" : ""}`}
              onClick={(e) => handleFavoriteClick(e, character)}
              title={isFavorite("characters", character.id) ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite("characters", character.id) ? "★" : "+"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Characters
