const express = require('express');
const sql = require('mssql'); // Import the mssql library
const connectToDatabase = require('./db'); // Import your database connection function
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });
  
// Define a route to fetch and display data
app.get('/admin', async (req, res) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Create a SQL query
    const query = 'SELECT * FROM admin';

    // Execute the query using the sql object
    const result = await sql.query(query);

    // Extract the data
    const complaints = result.recordset;

    // Send the data as JSON
    res.json(complaints);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  } finally {
    // Close the database connection
    sql.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
