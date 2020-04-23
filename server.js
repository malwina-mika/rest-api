const express = require('express');
const cors = require('cors');

const app = express();

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/testimonials', (req, res) => {
  res.render('db');
});

app.get('/testimonials/:id', (req, res) => {
  res.render(db.map(item => item.id));
});

app.get('/testimonials/random', (req, res) => {
  res.render(db);
});


app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});