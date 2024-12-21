const express = require('express');
const Event = require('../models/Event'); // Ensure 'Event.js' matches this casing
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware for authentication
const router = express.Router();

// Create a new event
router.post('/', authMiddleware, async (req, res) => {
  const { name, description, date } = req.body;

  if (!name || !description || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const event = new Event({
      name,
      description,
      date,
      createdBy: req.userId, // `req.userId` is set by auth middleware
    });

    await event.save();
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch all events created by the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.userId });
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update an event by its ID
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, description, date } = req.body;

  if (!name || !description || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const event = await Event.findOneAndUpdate(
      { _id: id, createdBy: req.userId }, // Ensure the event belongs to the logged-in user
      { name, description, date },
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ error: 'Event not found or not authorized' });
    }

    res.status(200).json({ message: 'Event updated successfully', event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete an event by its ID
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findOneAndDelete({ _id: id, createdBy: req.userId });

    if (!event) {
      return res.status(404).json({ error: 'Event not found or not authorized' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
