// Setup Express
const express = require("express");
const app = express();

// Import and setup CORS
// Needed for Cross-Origin AJAX requests
// Without this you will not able to fetch from React
// See https://developer.mozilla.org/en-US/docs/web/http/cors
const cors = require('cors');
app.use(cors())

//Parses JSON in request body
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "This is an example of API to be used with COMPX322-22X Assignment 4" });
});

//Routes for Entries
const entryRoutes = require("./app/routes/entry.routes.js")
app.use('/api', entryRoutes);


// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}.`);
});
