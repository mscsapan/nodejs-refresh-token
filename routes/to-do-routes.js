import express from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import { getAllTodoes, addNewTodo, updateTodo } from "../controllers/todo-controller.js";

const router = express.Router();

router.get('/get-todos', authMiddleware, getAllTodoes);
router.post('/add-todo', authMiddleware, addNewTodo);
router.put('/update-todo/:id', authMiddleware, updateTodo);

export default router;