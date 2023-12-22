const express = require('express');
const app = express();
const port = 3000;

// Mock database (replace with your actual database connection)
async function fetchRegisteredEmails() {
    const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('your_database_name');
        const collection = database.collection('your_collection_name');

        // Fetch registered emails
        const result = await collection.find({}, { projection: { email: 1, _id: 0 } }).toArray();
        const registeredEmails = result.map(entry => entry.email);

        return registeredEmails;
    } finally {
        await client.close();
    }
}

app.use(express.static('public'));

// Endpoint to fetch registered emails
app.get('/fetch-emails', (req, res) => {
    res.json(registeredEmails);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
