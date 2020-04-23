const express = require('express');
const cors = require('cors');
const db = require('./db.js');
const uuidv4 = require('uuid/v4');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.testimonials.filter(item => item.id == req.params.id));
});

app.get('/testimonials/random', (req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();

  const newTestimonial = {
    id: id,
    author: author,
    text: text
  }

  db.testimonials.push(newTestimonial);
  res.json({ message: 'ok' });
});

app.put('/testimonials/:id', (req, res) => {
  res.json({ message: 'ok' });
});

app.delete('/testimonials/:id', (req, res) => {
  const item = db.testimonials.find(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(item)

  db.testimonials.splice(index, 1)
  res.json({ message: 'ok' });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});