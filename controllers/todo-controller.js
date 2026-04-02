import Todo from "../models/todo-model.js";
import ApiError from "../utils/api-errors.js";
import { checkProperty } from "../utils/check-property.js";
export const getAllTodoes = async (req, res, next) => {
    try {
        // const todo = await Todo.find({ user: req.user.id });
        const todo = await Todo.find({ user: req.user.id }).populate('user', '-refreshToken');
        res.status(200).json({ success: true, todo });

    } catch (error) {
        next(error);
    }
}


export const addNewTodo = async (req, res, next) => {
    try {
        console.log(`method ${req.method}`);

        const { title, description, isCompleted } = req.body;


        if (!title || !description) {
            throw new ApiError(400, "Title and description are required");
        }

        const todo = await Todo.create({
            title,
            description,
            isCompleted,
            user: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};

export const updateTodo = async (req, res, next) => {
    try {
        const todoId = req.params.id;

        const { title, description, isCompleted } = req.body || {};

        const existingTodo = await Todo.findOne({
            _id: todoId,
            user: req.user.id,
        });

        if (!existingTodo) {
            throw new ApiError(404, "Todo not found");
        }

        if (title !== undefined) existingTodo.title = title;
        if (description !== undefined) existingTodo.description = description;
        if (isCompleted !== undefined) existingTodo.isCompleted = isCompleted;

        await existingTodo.save();

        res.json({
            success: true,
            message: "Todo updated successfully",
            data: existingTodo,
        });
    } catch (error) {
        next(error);
    }
};