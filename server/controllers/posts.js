import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({ ...post, creator: req.userId, createAt: new Date().toISOString() })

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

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    // Check to see if the _id is a mongoose object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with that id");
    }

    // Implement logic to delete a post
    await PostMessage.findByIdAndRemove(id)

    console.log("DELETE")

    // Return the response
    res.json({ message: "Post deleted successfully" })
}

export const likePost = async (req, res) => {
    const { id } = req.params

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" })
    }

    // Check to see if the _id is a mongoose object id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with that id");
    }

    // Find the post we are looking for
    const post = await PostMessage.findById(id);

    // This is to get the index where this userId exists in the likes array return -1 if not there
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        // Like a post, pushing userId into likes array
        post.likes.push(req.userId);

    } else {
        // Unlike a post, getting rid of userId from likes array by filtering
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    // 
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}