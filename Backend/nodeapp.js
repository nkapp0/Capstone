//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
//express port and mongo connection string
const app = express();
const PORT = process.env.PORT || 3000;
const database_connection = process.env.MONGODB_URI;
app.use(cors());
app.use(bodyParser.json());

// database connection
let db;
MongoClient.connect(database_connection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    db = client.db('Mizzou101');
    console.log('Connected to database');
  })
  .catch((err) => console.error('Error connecting to database:', err));


// api to retreive information from specified collection
app.get('/api/data/:collection', async (req, res) => {
  try {
    const { collection } = req.params;
    const data = await db.collection(collection).find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving data', error: err });
  }
});

// api to update data in specified collection
app.put('/api/data/:collection/:id', async (req, res) => {
  try {
    const { collection, id } = req.params;
    const updatedData = req.body;
    const result = await db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: updatedData });
    res.json({ message: 'Data updated successfully', modifiedCount: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ message: 'Error updating data', error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/api/search', (req, res) => {
  const query = req.query.query;
  db.collection('items').find({
      $or: [
          { Name: { $regex: query, $options: 'i' } },
          { Tags: { $regex: query, $options: 'i' } }
      ]
  }).toArray((err, docs) => {
      if (err) {
          res.status(500).send('Error searching items');
          return;
      }
      res.json(docs);
  });
});
