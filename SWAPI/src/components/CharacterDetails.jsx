"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

const CharacterDetail = () => {
  const { id } = useParams()
  const [character, setCharacter] = useState(null)
  const [films, setFilms] = useState([])
  const [homeworld, setHomeworld] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        // Fetch character details
        const characterResponse = await fetch(`http://localhost:9001/api/characters/${id}`)
        if (!characterResponse.ok) {
          throw new Error("Failed to fetch character data")
        }
        const characterData = await characterResponse.json()
        setCharacter(characterData)

        // Fetch films this character appears in
        const filmsResponse = await fetch(`http://localhost:9001/api/characters/${id}/films`)
        if (filmsResponse.ok) {
          const filmsData = await filmsResponse.json()
          setFilms(filmsData)
        }

        // Fetch homeworld data if available
        if (characterData.homeworld) {
          const homeworldResponse = await fetch(`http://localhost:9001/api/planets/${characterData.homeworld}`)
          if (homeworldResponse.ok) {
            const homeworldData = await homeworldResponse.json()
            setHomeworld(homeworldData)
          }
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCharacterData()
  }, [id])

  if (loading) return <div className="loading">Loading character details...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!character) return <div className="error">Character not found</div>

  return (
    <div className="detail-container">
      <Link to="/characters" className="back-link">
        ← Back to Characters
      </Link>

      <div className="detail-header">
        <h2>{character.name}</h2>
      </div>

      <div className="detail-info">
        <div className="detail-label">Gender:</div>
        <div>{character.gender}</div>

        <div className="detail-label">Birth Year:</div>
        <div>{character.birth_year}</div>

        <div className="detail-label">Height:</div>
        <div>{character.height} cm</div>

        <div className="detail-label">Mass:</div>
        <div>{character.mass} kg</div>

        <div className="detail-label">Hair Color:</div>
        <div>{character.hair_color}</div>

        <div className="detail-label">Skin Color:</div>
        <div>{character.skin_color}</div>

        <div className="detail-label">Eye Color:</div>
        <div>{character.eye_color}</div>

        <div className="detail-label">Homeworld:</div>
        <div>
          {homeworld ? (
            <span className="related-item" onClick={() => navigate(`/planets/${homeworld.id}`)}>
              {homeworld.name}
            </span>
          ) : (
            "Unknown"
          )}
        </div>
      </div>

      {films.length > 0 && (
        <div className="related-items">
          <h3>Appears in Films:</h3>
          <div className="related-list">
            {films.map((film) => (
              <span key={film.id} className="related-item" onClick={() => navigate(`/films/${film.id}`)}>
                {film.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CharacterDetail

