"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Characters = () => {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

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

  if (loading) return <div className="loading">Loading characters...</div>
  if (error) return <div className="error">Error loading characters: {error.message}</div>

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <ul className="item-list">
        {characters.map((character) => (
          <li key={character.id} className="item-card" onClick={() => handleCharacterClick(character.id)}>
            <div className="item-name">{character.name}</div>
            <div>Gender: {character.gender}</div>
            <div>Birth Year: {character.birth_year}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Characters

