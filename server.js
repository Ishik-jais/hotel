const express = require('express')
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());



//const MenuItem = require('./models/MenuItem');

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu', menuItemRoutes);

app.get('/', function (req, res) {
    res.send('Welcome to hotel')
})



// app.get('/person/:workType', async (req, res) => {
//     try {
//         const workType = req.params.work; // Extract the work type
//         if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
//             const response = await Person.find({ work: workType });
//             console.log('response fectched');
//             res.status(200).json(response);
//         } else {
//             res.status(404).json({ error: 'Invalid work type' });
//         }

//     } catch (error) {
//         console.error('Error fetching persons:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });



app.listen(3000, () => {
    console.log('open port 3000');
});