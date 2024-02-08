
import './App.css';

import React, { useState, useEffect } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Fetch users from API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));

    // Load search history from local storage
    const storedSearchHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(storedSearchHistory);
  }, []);

  const handleSearch = () => {
    // Update search history
    const updatedSearchHistory = [...searchHistory, searchTerm];
    setSearchHistory(updatedSearchHistory);

    // Save search history to local storage
    localStorage.setItem("searchHistory", JSON.stringify(updatedSearchHistory));
  };

  const handleSortByName = () => {
    // Sort all users by name
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sortedUsers);
  };

  return (
    <div>
      <h1>User Search App</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name"
      />

      {/* Search button */}
      <button onClick={handleSearch}>Search</button>

      {/* Search history */}
      <div>
        <h2>Search History</h2>
        <ul>
          {searchHistory.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </div>

      {/* Sort button */}
      <button onClick={handleSortByName}>Sort by Name</button>


      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
