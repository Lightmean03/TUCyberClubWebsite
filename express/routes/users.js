const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const collection = req.app.locals.db.collection('users');
    const users = await collection.find().toArray();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const collection = req.app.locals.db.collection('users');
    const user = await collection.findOne({ _id: ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const collection = req.app.locals.db.collection('users');
    const result = await collection.insertOne({ name, email });

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;
    const collection = req.app.locals.db.collection('users');
    const result = await collection.updateOne(
      { _id: ObjectId(userId) },
      { $set: { name, email } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const collection = req.app.locals.db.collection('users');
    const result = await collection.deleteOne({ _id: ObjectId(userId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
