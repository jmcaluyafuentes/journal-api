import { Router } from 'express'
import { Entry } from '../db.js' // Take note: Two dots ../

// Create an instance of Router function
const router = Router()

// Get list of entries
// app.get('/entries', async (req, res) => res.send(await Entry.find().populate('category')))
// Attach the route to the instance of Router directly instead of the app
router.get('/entries', async (req, res) => res.send(await Entry.find()))
// Use populate method to return the category object
    // Review the recorded lesson

// Get one entry
// app.get('/entries/:id', async (req, res) => {
router.get('/entries/:id', async (req, res) => {
    try {
        const entry = await Entry.findById(req.params.id).populate('category') 

        if (entry) {
            res.send(entry)
        } else {
            res.status(404).send({error: 'Entry not found'})
        }
    }
    catch (err) {
        res.status(404).send({error: err.message})
    }
})

// Create an entry
// app.post('/entries', async (req, res) => {
router.post('/entries', async (req, res) => {
    try {
        // TODO: Validate the data        
        const newEntry = await Entry.create(req.body)

        res.status(201).send(newEntry)
    }
    catch (err) {
        res.status(400).send({ error: err.message })
    }
})

// Update an entry
// app.put('/entries/:id', async (req, res) => {
router.put('/entries/:id', async (req, res) => {
    try {
        const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, {returnDocument: 'after'}).populate('category');
            if (entry) {
            res.send(entry)
        } else {
            res.status(400).send({ error: 'Entry not found' })
        }
    }
    catch (err) {
        res.status(404).send({ error: err.message })
    }
})

// Delete an entry
// app.delete('/entries/:id', async (req, res) => {
router.delete('/entries/:id', async (req, res) => {
    try {
        const entry = await Entry.findByIdAndDelete(req.params.id);
            // findByIdAndUpdate will automatically save the updates to db
            // The default behavior of mongoose is to return the unmodified document and not the updated version
            // {returnDocument: 'after'} as the 3rd parameter will return the updated version
        if (entry) {
            res.sendStatus(200)
            // In delete operation, we don't need to return the entry being deleted
            // But will return the status 200 thru sendStatus() method
        } else {
            res.status(400).send({ error: 'Entry not found' })
        }
    }
    catch (err) {
        res.status(404).send({ error: err.message })
    }
})

// Make the router the default export
export default router
    // When exporting as default, it is exported anonymously meaning router is only local name and is not included in export.


