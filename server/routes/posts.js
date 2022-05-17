import express from 'express'

import { getPosts, createPost, updatePost } from '../controllers/posts.js';

const router = express.Router();

// The second parameter that's the callback function, can be moved to folder named
// controllers and the logic will be places there so the parameter will still be a 
// function, but from controller/posts.js
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);

export default router;