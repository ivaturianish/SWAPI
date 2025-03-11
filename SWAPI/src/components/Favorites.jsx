"use client"
import { useNavigate } from "react-router-dom"
import { useFavorites } from "./FavoritesContext"

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites()
  const navigate = useNavigate()

  const handleItemClick = (type, id) => {
    navigate(`/${type}/${id}`)
  }

  // Check if there are any favorites
  const hasFavorites = favorites.characters.length > 0 || favorites.planets.length > 0 || favorites.films.length > 0

  return (
    <div className="favorites-container">
      <h2>Your Favorites</h2>

      {!hasFavorites && (
        <div className="no-favorites">
          <p>You haven't added any favorites yet.</p>
          <p>Explore the galaxy and click the + button on items you like!</p>
        </div>
      )}

      {favorites.characters.length > 0 && (
        <div className="favorites-section">
          <h3>Characters</h3>
          <ul className="item-list">
            {favorites.characters.map((character) => (
              <li key={`char-${character.id}`} className="item-card favorite-item">
                <div className="item-content" onClick={() => handleItemClick("characters", character.id)}>
                  <div className="item-name">{character.name}</div>
                  <div>Gender: {character.gender}</div>
                  <div>Birth Year: {character.birth_year}</div>
                </div>
                <button
                  className="remove-favorite-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFavorite("characters", character.id)
                  }}
                  title="Remove from favorites"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {favorites.planets.length > 0 && (
        <div className="favorites-section">
          <h3>Planets</h3>
          <ul className="item-list">
            {favorites.planets.map((planet) => (
              <li key={`planet-${planet.id}`} className="item-card favorite-item">
                <div className="item-content" onClick={() => handleItemClick("planets", planet.id)}>
                  <div className="item-name">{planet.name}</div>
                  <div>Climate: {planet.climate}</div>
                  <div>Terrain: {planet.terrain}</div>
                </div>
                <button
                  className="remove-favorite-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFavorite("planets", planet.id)
                  }}
                  title="Remove from favorites"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {favorites.films.length > 0 && (
        <div className="favorites-section">
          <h3>Films</h3>
          <ul className="item-list">
            {favorites.films.map((film) => (
              <li key={`film-${film.id}`} className="item-card favorite-item">
                <div className="item-content" onClick={() => handleItemClick("films", film.id)}>
                  <div className="item-name">{film.title}</div>
                  <div>Episode: {film.episode_id}</div>
                  <div>Director: {film.director}</div>
                </div>
                <button
                  className="remove-favorite-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFavorite("films", film.id)
                  }}
                  title="Remove from favorites"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Favorites

