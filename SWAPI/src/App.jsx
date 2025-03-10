import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import "./App.css"
import Characters from "./components/Characters.jsx"
import Planets from "./components/Planets"
import Films from "./components/Films"
import CharacterDetail from "./components/CharacterDetails"
import PlanetDetail from "./components/PlanetDetails"
import FilmDetail from "./components/FilmDetail"

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Star Wars Database</h1>
          <nav className="main-nav">
            <Link to="/characters" className="nav-link">
              Characters
            </Link>
            <Link to="/planets" className="nav-link">
              Planets
            </Link>
            <Link to="/films" className="nav-link">
              Films
            </Link>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:id" element={<CharacterDetail />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="/planets/:id" element={<PlanetDetail />} />
            <Route path="/films" element={<Films />} />
            <Route path="/films/:id" element={<FilmDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div className="home">
      <h2>Welcome to the Star Wars Database</h2>
      <p>Click on the links above to explore characters, planets, and films from the Star Wars universe.</p>
      <div style={{ marginTop: "2rem" }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/694px-Star_Wars_Logo.svg.png"
          alt="Star Wars Logo"
          style={{ maxWidth: "300px", opacity: 0.8 }}
        />
      </div>
    </div>
  )
}

export default App

