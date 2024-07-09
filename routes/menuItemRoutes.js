const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        // Save the new person to the database using await
        const response = await newMenu.save();
        console.log('Saved menu to database');
        res.status(200).json(response);
    } catch (error) {
        console.error('Error saving menu:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/', async (req, res) => {
    try {
        // Use the Mongoose model to fetch all persons from the
        const data = await MenuItem.find();
        console.log('data fetch');
        // Send the list of persons as a JSON response
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;