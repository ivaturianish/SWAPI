"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

const FilmDetail = () => {
  const { id } = useParams()
  const [film, setFilm] = useState(null)
  const [characters, setCharacters] = useState([])
  const [planets, setPlanets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        // Fetch film details
        const filmResponse = await fetch(`http://localhost:9001/api/films/${id}`)
        if (!filmResponse.ok) {
          throw new Error("Failed to fetch film data")
        }
        const filmData = await filmResponse.json()
        setFilm(filmData)

        // Fetch characters in this film
        const charactersResponse = await fetch(`http://localhost:9001/api/films/${id}/characters`)
        if (charactersResponse.ok) {
          const charactersData = await charactersResponse.json()
          setCharacters(charactersData)
        }

        // Fetch planets in this film
        const planetsResponse = await fetch(`http://localhost:9001/api/films/${id}/planets`)
        if (planetsResponse.ok) {
          const planetsData = await planetsResponse.json()
          setPlanets(planetsData)
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFilmData()
  }, [id])

  if (loading) return <div className="loading">Loading film details...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!film) return <div className="error">Film not found</div>

  return (
    <div className="detail-container">
      <Link to="/films" className="back-link">
        ← Back to Films
      </Link>

      <div className="detail-header">
        <h2>{film.title}</h2>
        <div>Episode {film.episode_id}</div>
      </div>

      <div className="detail-info">
        <div className="detail-label">Director:</div>
        <div>{film.director}</div>

        <div className="detail-label">Producer:</div>
        <div>{film.producer}</div>

        <div className="detail-label">Release Date:</div>
        <div>{film.release_date}</div>
      </div>

      <div className="film-crawl">
        <h3>Opening Crawl:</h3>
        <p style={{ whiteSpace: "pre-line" }}>{film.opening_crawl}</p>
      </div>

      {characters.length > 0 && (
        <div className="related-items">
          <h3>Characters:</h3>
          <div className="related-list">
            {characters.map((character) => (
              <span key={character.id} className="related-item" onClick={() => navigate(`/characters/${character.id}`)}>
                {character.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {planets.length > 0 && (
        <div className="related-items">
          <h3>Planets:</h3>
          <div className="related-list">
            {planets.map((planet) => (
              <span key={planet.id} className="related-item" onClick={() => navigate(`/planets/${planet.id}`)}>
                {planet.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilmDetail

