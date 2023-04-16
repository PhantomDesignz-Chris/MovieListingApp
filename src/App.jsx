import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import SearchIcon from './search-icon.svg';
import './App.css';

const API_KEY = '784c9fe0'
const API_URL = 'https://www.omdbapi.com/'

export default function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      searchMovies('Spiderman');
    }, []);

    const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${title}`);
      const data = await response.json();
      //console.log(data.data);
      setMovies(data.Search);
  }
  
  return (
  <div className="app">
    <h1>MovieLand</h1>

    <div className="search">
      <input placeholder="Search for Movies" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
    </div>

    {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
  </div>
  );
};