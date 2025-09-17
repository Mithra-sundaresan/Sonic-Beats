// src/App.jsx

import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  // Global state for page navigation
  const [currentPage, setCurrentPage] = useState("signin"); // signin | signup | app

  // Music app states
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [activeSection, setActiveSection] = useState("home"); // home | playlist | favourites

  // Fetch songs
  useEffect(() => {
    fetch("/db/db.json")
      .then((res) => res.json())
      .then((data) => setSongs(data.items))
      .catch((err) => console.error("Error loading songs:", err));
  }, []);

  // Filter logic
  const filteredSongs =
    activeSection === "home"
      ? songs.filter(
          (song) =>
            song.title.toLowerCase().includes(search.toLowerCase()) ||
            song.singer.toLowerCase().includes(search.toLowerCase()) ||
            song.genre.toLowerCase().includes(search.toLowerCase())
        )
      : activeSection === "playlist"
      ? playlist
      : favourites;

  const addToPlaylist = (song) => {
    if (!playlist.find((s) => s.id === song.id)) {
      setPlaylist([...playlist, song]);
    }
  };

  const addToFavourites = (song) => {
    if (!favourites.find((s) => s.id === song.id)) {
      setFavourites([...favourites, song]);
    }
  };

  // Sign In Page
  const renderSignIn = () => (
    <div className="flex justify-center items-center h-screen bg-white-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={() => setCurrentPage("app")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Sign In
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <button
            className="text-blue-600 underline"
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );

  // Sign Up Page
  const renderSignUp = () => (
    <div className="flex justify-center items-center h-screen bg-white-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={() => setCurrentPage("app")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <button
            className="text-blue-600 underline"
            onClick={() => setCurrentPage("signin")}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );

  // Main Music App UI
  const renderMusicApp = () => (
    <div className="flex h-screen bg-gradient-to-r from-pink-500 to-blue-400 text-pink-900">
      {/* Sidebar */}
      <div className="w-64 bg-blue-223 text-white flex flex-col p-6">
        <h1
          className="text-2xl font-bold mb-8 text-center"
          style={{ fontStyle: "unset", color: "black" }}
        >
          🎶SONIC BEATS
        </h1>

        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => setActiveSection("home")}
            className={`text-left p-2 rounded ${
              activeSection === "home"
                ? "bg-white text-black font-bold"
                : "hover:bg-white hover:text-black"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveSection("playlist")}
            className={`text-left p-2 rounded ${
              activeSection === "playlist"
                ? "bg-white text-black font-bold"
                : "hover:bg-white hover:text-black"
            }`}
          >
            Playlist ({playlist.length})
          </button>
          <button
            onClick={() => setActiveSection("favourites")}
            className={`text-left p-2 rounded ${
              activeSection === "favourites"
                ? "bg-white text-black font-bold"
                : "hover:bg-white hover:text-black"
            }`}
          >
            Favourites ({favourites.length})
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto main-content rounded-tl-3xl shadow-lg bg-blue">
        {/* Search Bar */}
        {activeSection === "home" && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search songs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 rounded border border-gray-300 shadow-sm"
            />
          </div>
        )}

        {/* Section Title */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold capitalize mb-2">
            {activeSection}
          </h2>
          <p className="text-gray-600">
            {activeSection === "home" &&
              "Browse all songs and add them to your Playlist or Favourites."}
            {activeSection === "playlist" && "Your personal playlist."}
            {activeSection === "favourites" && "Your favourite songs."}
          </p>
        </div>

        {/* Songs Grid */}
        {filteredSongs.length === 0 ? (
          <p className="text-center text-gray-500">No songs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSongs.map((song) => (
              <div
                className="song-card bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                key={song.id}
              >
                <img
                  src={song.imgUrl}
                  alt={song.title}
                  className="cover w-full h-40 object-cover rounded"
                />
                <h2 className="text-lg font-bold mt-3">{song.title}</h2>
                <p>
                  <strong>Singer:</strong> {song.singer}
                </p>
                <p>
                  <strong>Genre:</strong> {song.genre}
                </p>
                <audio controls className="w-full mt-3 rounded">
                  <source src={song.songUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>

                {activeSection === "home" && (
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => addToPlaylist(song)}
                      className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      ➕ Playlist
                    </button>
                    <button
                      onClick={() => addToFavourites(song)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                    >
                      ❤️ Favourite
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Final return
  return (
    <>
      {currentPage === "signin" && renderSignIn()}
      {currentPage === "signup" && renderSignUp()}
      {currentPage === "app" && renderMusicApp()}
    </>
  );
}

export default App;
