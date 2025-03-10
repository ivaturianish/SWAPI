"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

const PlanetDetail = () => {
  const { id } = useParams()
  const [planet, setPlanet] = useState(null)
  const [films, setFilms] = useState([])
  const [residents, setResidents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPlanetData = async () => {
      try {
        // Fetch planet details
        const planetResponse = await fetch(`http://localhost:9001/api/planets/${id}`)
        if (!planetResponse.ok) {
          throw new Error("Failed to fetch planet data")
        }
        const planetData = await planetResponse.json()
        setPlanet(planetData)

        // Fetch films this planet appears in
        const filmsResponse = await fetch(`http://localhost:9001/api/planets/${id}/films`)
        if (filmsResponse.ok) {
          const filmsData = await filmsResponse.json()
          setFilms(filmsData)
        }

        // Fetch characters from this planet
        const residentsResponse = await fetch(`http://localhost:9001/api/planets/${id}/characters`)
        if (residentsResponse.ok) {
          const residentsData = await residentsResponse.json()
          setResidents(residentsData)
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPlanetData()
  }, [id])

  if (loading) return <div className="loading">Loading planet details...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!planet) return <div className="error">Planet not found</div>

  return (
    <div className="detail-container">
      <Link to="/planets" className="back-link">
        ← Back to Planets
      </Link>

      <div className="detail-header">
        <h2>{planet.name}</h2>
      </div>

      <div className="detail-info">
        <div className="detail-label">Climate:</div>
        <div>{planet.climate}</div>

        <div className="detail-label">Terrain:</div>
        <div>{planet.terrain}</div>

        <div className="detail-label">Diameter:</div>
        <div>{planet.diameter} km</div>

        <div className="detail-label">Rotation Period:</div>
        <div>{planet.rotation_period} hours</div>

        <div className="detail-label">Orbital Period:</div>
        <div>{planet.orbital_period} days</div>

        <div className="detail-label">Gravity:</div>
        <div>{planet.gravity}</div>

        <div className="detail-label">Surface Water:</div>
        <div>{planet.surface_water}%</div>

        <div className="detail-label">Population:</div>
        <div>{planet.population}</div>
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

      {residents.length > 0 && (
        <div className="related-items">
          <h3>Notable Residents:</h3>
          <div className="related-list">
            {residents.map((resident) => (
              <span key={resident.id} className="related-item" onClick={() => navigate(`/characters/${resident.id}`)}>
                {resident.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PlanetDetail

