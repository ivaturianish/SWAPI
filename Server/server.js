const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const fakePlanets = [
    { id: 1, name: 'Mercury' },
    { id: 2, name: 'Venus' },
    { id: 3, name: 'Earth' },
    { id: 4, name: 'Mars' }
];

app.get('/api/planets', (req, res) => {
    res.json(fakePlanets);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});