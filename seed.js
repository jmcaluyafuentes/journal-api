import mongoose from 'mongoose'
import { Entry, Category } from './db.js'

//Refactor: Since schema was changed
const categories = [
    { name: 'Food' },
    { name: 'Gaming' },
    { name: 'Coding' },
    { name: 'Other' }
]

// Insert first the categories before the entries so that we can access the id of categories
await Category.deleteMany() // deleteMany is mongoose method
console.log('Deleted Categories')

// Assign the result of inserMany into cats variable
const cats = await Category.insertMany(categories) // insertMany is mongoose method
console.log('Added Categories')

// console.log(categories)
// console.log(cats)
    // The order of documents in insertMany is consistent

// console.log(await Category.find({name: 'Food'}))
// find() will return an array

// Use findOne if we are expecting one document
// findOne() returns an object
// console.log(await Category.findOne({name: 'Food'}))

const entries = [
    // { category: 'Food', content: 'Pizza is yummy!' },
    // { category: cats[0]._id, content: 'Pizza is yummy!' },
    // In db, the value of category in entries will be the category id because of cats[0].id thus entries and categories have relationship
    { category: cats[0], content: 'Pizza is yummy!' },
    // No need to add '.id' since mongoose will extract automatically the id only of that model
    // But it does not return the category name. Solution: Use populate (see index.js)
    
    { category: cats[1], content: 'Coding is fun!' },
    { category: cats[2], content: 'War. War never changes.' },
]
    // Removed the id key since it is automatically generated in mongoDB


await Entry.deleteMany() // deleteMany is mongoose method
console.log('Deleted Entries')

await Entry.insertMany(entries) // insertMany is mongoose method
console.log('Added Entries')

// // This is to disconnect the connection after running 'npm run seed' while server is running.
mongoose.disconnect()

