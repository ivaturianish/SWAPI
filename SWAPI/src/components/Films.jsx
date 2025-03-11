"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFavorites } from "./FavoritesContext"

const Films = () => {
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { addFavorite, isFavorite, removeFavorite } = useFavorites()

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("http://localhost:9001/api/films")
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        setFilms(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchFilms()
  }, [])

  const handleFilmClick = (id) => {
    navigate(`/films/${id}`)
  }

  const handleFavoriteClick = (e, film) => {
    e.stopPropagation()

    if (isFavorite("films", film.id)) {
      removeFavorite("films", film.id)
    } else {
      addFavorite("films", film)
    }
  }

  if (loading) return <div className="loading">Loading films...</div>
  if (error) return <div className="error">Error loading films: {error.message}</div>

  return (
    <div>
      <h2>Star Wars Films</h2>
      <ul className="item-list">
        {films.map((film) => (
          <li key={film.id} className="item-card">
            <div className="item-content" onClick={() => handleFilmClick(film.id)}>
              <div className="item-name">{film.title}</div>
              <div>Episode: {film.episode_id}</div>
              <div>Director: {film.director}</div>
              <div>Release Date: {film.release_date}</div>
            </div>
            <button
              className={`favorite-btn ${isFavorite("films", film.id) ? "is-favorite" : ""}`}
              onClick={(e) => handleFavoriteClick(e, film)}
              title={isFavorite("films", film.id) ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite("films", film.id) ? "★" : "+"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Films

