import express from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import { getAllTodoes, addNewTodo, updateTodo, deleteTodo } from "../controllers/todo-controller.js";

const router = express.Router();

router.get('/get-todos', authMiddleware, getAllTodoes);
router.post('/add-todo', authMiddleware, addNewTodo);
router.put('/update-todo/:id', authMiddleware, updateTodo);
router.delete('/delete-todo/:id', authMiddleware, deleteTodo);

export default router;