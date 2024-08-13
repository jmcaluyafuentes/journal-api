import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.DB_URI)
    .then(m => console.log(m.connection.readyState === 1 ? 'Mongoose connected' : 'Mongoose failed to connect')) // m.connection.readyState will return 1 if connected to Mongoose
    .catch(err => console.error(err))

const entrySchema = {
    // category: { type: String, required: true },
    category: { type: mongoose.ObjectId, ref: 'Category', required: true },
        // This is like a foreign key in ORM
        // An entry can only be of one category because of mongoose.ObjectId
        // ref key will refer to the name of collection where it is referred to
    content: { type: String, required: true }
}

const Entry = mongoose.model('Entry', entrySchema)

const Category = mongoose.model('Category', {
    name: { type: String, required: true },
})

export { Entry, Category }

