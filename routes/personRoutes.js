const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/', async (req, res) => {
    try {
        const newPersonData = req.body;
        const newPerson = new Person(newPersonData);
        // Save the new person to the database using await
        const savedPerson = await newPerson.save();
        console.log('Saved person to database');
        res.status(201).json(savedPerson);
    } catch (error) {
        console.error('Error saving person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/', async (req, res) => {
    try {
        // Use the Mongoose model to fetch all persons from the
        const data = await Person.find();
        console.log('data fetch');
        // Send the list of persons as a JSON response
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the person's ID

        const updatedPersonData = req.body; // Updated data for the
        // Assuming you have a Person model
        const response = await
            Person.findByIdAndUpdate(personId, updatedPersonData, {
                new: true, // Return the updated document
                runValidators: true, // Run Mongoose validation
            });
        if (!response) {
            return res.status(404).json({
                error: 'Person not found'
            });
        }
        // Send the updated person data as a JSON response
        console.log('data updated')
        res.json(response);
    } catch (error) {
        console.error('Error updating person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the person's ID

        // Assuming you have a Person model
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        // Send a success message as a JSON response
        console.log('data deleted');
        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;