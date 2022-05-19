import express from 'express'

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';

import auth from '../middleware/auth.js'

const router = express.Router();

// The second parameter that's the callback function, can be moved to folder named
// controllers and the logic will be places there so the parameter will still be a 
// function, but from controller/posts.js
router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost)

export default router;