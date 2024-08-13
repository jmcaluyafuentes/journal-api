import express from 'express'
import { Category } from './db.js'
import entryRoutes from './routes/entry_routes.js'
import cors from 'cors'

const app = express()

// Middleware
app.use(cors()) 
    // By default, if no argument passed, it will allow all origins as wildcard.
    // During development, we can leave this as is
    // During production, we must only allow the frontend to access the api
    
    // TODO: Prod: Add origin restriction to cors call

app.use(express.json())

app.get('/', (request, response) => response.send({info: 'Journal API!'}))

// TODO: Move /categories route to a routes module
// TODO: Complete categories CRUD
// TODO: ADVANCED: Add a route GET /categories/:cat_id/entries that returns all entries in a given category

// Get list of categories
app.get('/categories', async (req, res) => res.send(await Category.find()))

// entryRoutes is a middleware
// Attach it using use() method
// Take note location, it is between the app.user(express.json()) and app.listen
app.use(entryRoutes)

// Refactor: Modularise by moving it to routes folder

// // Get list of entries
// app.get('/entries', async (req, res) => res.send(await Entry.find().populate('category')))
//     // Use populate method to return the category object
//     // Review the recorded lesson

// // Get one entry
// app.get('/entries/:id', async (req, res) => {
//     try {
//         const entry = await Entry.findById(req.params.id).populate('category') 

//         if (entry) {
//             res.send(entry)
//         } else {
//             res.status(404).send({error: 'Entry not found'})
//         }
//     }
//     catch (err) {
//         res.status(404).send({error: err.message})
//     }
// })

// // Create an entry
// app.post('/entries', async (req, res) => {
//     try {
//         // TODO: Validate the data        
//         const newEntry = await Entry.create(req.body)

//         res.status(201).send(newEntry)
//     }
//     catch (err) {
//         res.status(400).send({ error: err.message })
//     }
// })

// // Update an entry
// app.put('/entries/:id', async (req, res) => {
//     try {
//         const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, {returnDocument: 'after'}).populate('category');
//             if (entry) {
//             res.send(entry)
//         } else {
//             res.status(400).send({ error: 'Entry not found' })
//         }
//     }
//     catch (err) {
//         res.status(404).send({ error: err.message })
//     }
// })

// // Delete an entry
// app.delete('/entries/:id', async (req, res) => {
//     try {
//         const entry = await Entry.findByIdAndDelete(req.params.id);
//             // findByIdAndUpdate will automatically save the updates to db
//             // The default behavior of mongoose is to return the unmodified document and not the updated version
//             // {returnDocument: 'after'} as the 3rd parameter will return the updated version
//         if (entry) {
//             res.sendStatus(200)
//             // In delete operation, we don't need to return the entry being deleted
//             // But will return the status 200 thru sendStatus() method
//         } else {
//             res.status(400).send({ error: 'Entry not found' })
//         }
//     }
//     catch (err) {
//         res.status(404).send({ error: err.message })
//     }
// })

app.listen(4001, err => { 
// Default port is 3000
    if (err) {
        console.error(err)
    } else {
        console.error('Server running')
    }
})




