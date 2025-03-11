"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  // Fetch data based on search query
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        // Fetch characters, planets, and films in parallel
        const [charactersRes, planetsRes, filmsRes] = await Promise.all([
          fetch("http://localhost:9001/api/characters"),
          fetch("http://localhost:9001/api/planets"),
          fetch("http://localhost:9001/api/films"),
        ])

        const [characters, planets, films] = await Promise.all([
          charactersRes.json(),
          planetsRes.json(),
          filmsRes.json(),
        ])

        // Filter results based on query
        const lowerQuery = query.toLowerCase()

        const filteredCharacters = characters
          .filter((char) => char.name.toLowerCase().includes(lowerQuery))
          .map((char) => ({ ...char, type: "character", path: `/characters/${char.id}` }))

        const filteredPlanets = planets
          .filter((planet) => planet.name.toLowerCase().includes(lowerQuery))
          .map((planet) => ({ ...planet, type: "planet", path: `/planets/${planet.id}` }))

        const filteredFilms = films
          .filter((film) => film.title.toLowerCase().includes(lowerQuery))
          .map((film) => ({ ...film, type: "film", path: `/films/${film.id}` }))

        // Combine and sort results
        const combinedResults = [...filteredCharacters, ...filteredPlanets, ...filteredFilms].sort((a, b) => {
          const aName = a.name || a.title || ""
          const bName = b.name || b.title || ""
          return aName.localeCompare(bName)
        })

        setResults(combinedResults.slice(0, 10)) // Limit to 10 results
      } catch (error) {
        console.error("Error fetching search results:", error)
      } finally {
        setLoading(false)
      }
    }

    // Debounce search to avoid too many requests
    const timeoutId = setTimeout(() => {
      fetchSearchResults()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleResultClick = (path) => {
    navigate(path)
    setQuery("")
    setShowResults(false)
  }

  const getResultIcon = (type) => {
    switch (type) {
      case "character":
        return "👤"
      case "planet":
        return "🌍"
      case "film":
        return "🎬"
      default:
        return "❔"
    }
  }

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search the galaxy..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowResults(true)
          }}
          onFocus={() => setShowResults(true)}
        />
        {query && (
          <button
            className="search-clear-btn"
            onClick={() => {
              setQuery("")
              setResults([])
            }}
          >
            ×
          </button>
        )}
      </div>

      {showResults && (query || results.length > 0) && (
        <div className="search-results">
          {loading ? (
            <div className="search-loading">Searching the galaxy...</div>
          ) : results.length > 0 ? (
            <ul className="search-results-list">
              {results.map((result) => (
                <li
                  key={`${result.type}-${result.id}`}
                  className="search-result-item"
                  onClick={() => handleResultClick(result.path)}
                >
                  <span className="result-icon">{getResultIcon(result.type)}</span>
                  <span className="result-name">{result.name || result.title}</span>
                  <span className="result-type">{result.type}</span>
                </li>
              ))}
            </ul>
          ) : query ? (
            <div className="search-no-results">No results found in this galaxy</div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default SearchBar

