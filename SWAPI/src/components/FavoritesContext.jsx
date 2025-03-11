"use client"

import { createContext, useState, useEffect, useContext } from "react"

// Create the context
const FavoritesContext = createContext()

// Custom hook to use the favorites context
export const useFavorites = () => useContext(FavoritesContext)

// Provider component
export const FavoritesProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("starWarsFavorites")
    return savedFavorites
      ? JSON.parse(savedFavorites)
      : {
          characters: [],
          planets: [],
          films: [],
        }
  })

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("starWarsFavorites", JSON.stringify(favorites))
  }, [favorites])

  // Add an item to favorites
  const addFavorite = (type, item) => {
    setFavorites((prev) => {
      // Check if item already exists in favorites
      const exists = prev[type].some((fav) => fav.id === item.id)
      if (exists) return prev

      // Add the item to the appropriate category
      return {
        ...prev,
        [type]: [...prev[type], item],
      }
    })
  }

  // Remove an item from favorites
  const removeFavorite = (type, itemId) => {
    setFavorites((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item.id !== itemId),
    }))
  }

  // Check if an item is in favorites
  const isFavorite = (type, itemId) => {
    return favorites[type].some((item) => item.id === itemId)
  }

  // Get all favorites
  const getAllFavorites = () => {
    return favorites
  }

  // Count total favorites
  const getFavoritesCount = () => {
    return favorites.characters.length + favorites.planets.length + favorites.films.length
  }

  // Value to be provided to consumers
  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    getAllFavorites,
    getFavoritesCount,
  }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

