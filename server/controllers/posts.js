import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post)

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    // The id is coming from the route: /posts/:id the :id part is the params
    // Also renaming the id property to _id
    const { id: _id } = req.params;
    const post = req.body;

    // Check to see if the _id is a mongoose object id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post with that id");
    }

    const updatePost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatedPost);
}