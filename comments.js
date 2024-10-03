// Create web server using express
// Create a route to handle comments
// Create a route to handle adding comments
// Create a route to handle deleting comments
// Create a route to handle editing comments
// Create a route to handle upvoting comments
// Create a route to handle downvoting comments

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const comments = [
  { id: 1, user: 'Alice', message: 'First!' },
  { id: 2, user: 'Bob', message: 'Second!' },
  { id: 3, user: 'Charlie', message: 'Third!' },
];

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  res.json(comment);
});

app.delete('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = comments.findIndex(comment => comment.id === id);
  if (index >= 0) {
    const comment = comments.splice(index, 1)[0];
    res.json(comment);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

app.put('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = comments.findIndex(comment => comment.id === id);
  if (index >= 0) {
    const comment = comments[index];
    Object.assign(comment, req.body);
    res.json(comment);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

app.post('/comments/:id/upvote', (req, res) => {
  const id = parseInt(req.params.id);
  const index = comments.findIndex(comment => comment.id === id);
  if (index >= 0) {
    comments[index].upvotes = comments[index].upvotes + 1 || 1;
    res.json(comments[index]);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

app.post('/comments/:id/downvote', (req, res) => {
  const id = parseInt(req.params.id);
  const index =