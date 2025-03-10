"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Planets = () => {
  const [planets, setPlanets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch("http://localhost:9001/api/planets")
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        setPlanets(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlanets()
  }, [])

  const handlePlanetClick = (id) => {
    navigate(`/planets/${id}`)
  }

  if (loading) return <div className="loading">Loading planets...</div>
  if (error) return <div className="error">Error loading planets: {error.message}</div>

  return (
    <div>
      <h2>Star Wars Planets</h2>
      <ul className="item-list">
        {planets.map((planet) => (
          <li key={planet.id} className="item-card" onClick={() => handlePlanetClick(planet.id)}>
            <div className="item-name">{planet.name}</div>
            <div>Climate: {planet.climate}</div>
            <div>Terrain: {planet.terrain}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Planets

