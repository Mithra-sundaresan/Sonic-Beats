import React, { useEffect, useState } from "react";
// ... other imports ...

function App() {
  const [currentPage, setCurrentPage] = useState("signin"); // signin | signup | app

  // Your existing states
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [activeSection, setActiveSection] = useState("home");

  // Existing useEffect and other logic...

  // Your existing App UI wrapped in a function to render only when currentPage === "app"
  const renderMusicApp = () => {
    if (currentPage !== "app") return null;

    // The entire JSX you currently have in your App component's return,
    // starting with <div className="flex h-screen bg-gradient-to-r ... > ... </div>
    return (
      <div className="flex h-screen bg-gradient-to-r from-pink-500 to-blue-400 text-gray-900">
        {/* Your existing music player UI */}
        {/* ... all your existing JSX ... */}
      </div>
    );
  };

  // Simple SignIn UI (replace with your actual form)
  const renderSignIn = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      {/* Replace below with your sign-in form */}
      <button
        onClick={() => setCurrentPage("app")}
        className="px-6 py-2 bg-blue-600 text-white rounded"
      >
        Simulate Sign In
      </button>
      <p className="mt-4">
        Don't have an account?{" "}
        <button
          className="text-blue-600 underline"
          onClick={() => setCurrentPage("signup")}
        >
          Sign Up
        </button>
      </p>
    </div>
  );

  // Simple SignUp UI (replace with your actual form)
  const renderSignUp = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      {/* Replace below with your sign-up form */}
      <button
        onClick={() => setCurrentPage("signin")}
        className="px-6 py-2 bg-green-600 text-white rounded"
      >
        Go to Sign In
      </button>
      <p className="mt-4">
        Already have an account?{" "}
        <button
          className="text-green-600 underline"
          onClick={() => setCurrentPage("signin")}
        >
          Sign In
        </button>
      </p>
    </div>
  );

  return (
    <>
      {currentPage === "signin" && renderSignIn()}
      {currentPage === "signup" && renderSignUp()}
      {currentPage === "app" && renderMusicApp()}
    </>
  );
}

export default App;
