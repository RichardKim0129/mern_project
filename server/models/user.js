// Import mongoose
import mongoose from 'mongoose'

// Create schema
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
});

// Create and export model
export default mongoose.model("User", userSchema);