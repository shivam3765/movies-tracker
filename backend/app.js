// Import required modules
const express = require('express');
const axios = require('axios');

// Initialize Express app
const app = express();
app.use(express.json());

// API key for OMDB
const apiKey = '2db23b47';

// In-memory movie storage (for simplicity)
let movies = [];

// Route to retrieve movie data from the OMDB API
app.get('/', (req, res) => {
  res.send("This is home page")
})

app.get('/api/movies/:title', async (req, res) => {
  try {
    const { title } = req.params;

    // Make an HTTP GET request to the OMDB API
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`);
    const movieData = response.data;

    // Return the movie data as the API response
    res.json(movieData);
  } catch (error) {
    console.error('Error retrieving movie data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to add a new movie
app.post('/api/movies', (req, res) => {
  try {
    const newMovie = req.body;

    // Add the new movie to the in-memory storage
    movies.push(newMovie);

    // Return the added movie as the API response
    res.json(newMovie);
    console.log("post route reached");
  } catch (error) {
    console.error('Error adding a new movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update an existing movie
app.put('/api/movies/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = req.body;

    // Find the movie in the in-memory storage and update it
    const index = movies.findIndex(movie => movie.id === id);
    if (index !== -1) {
      movies[index] = { ...movies[index], ...updatedMovie };
      res.json(movies[index]);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    console.error('Error updating a movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to delete a movie
app.delete('/api/movies/:id', (req, res) => {
  try {
    const { id } = req.params;

    // Find the movie in the in-memory storage and remove it
    const index = movies.findIndex(movie => movie.id === id);
    if (index !== -1) {
      const deletedMovie = movies[index];
      movies.splice(index, 1);
      res.json(deletedMovie);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    console.error('Error deleting a movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
