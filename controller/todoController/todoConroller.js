import moment from "moment";
import UserModel from "../../model/AuthMedel/Auth.js";
import TodoModel from "../../model/TodoModel/Todo.js";
import { customConsole } from "../../util/constent/Constent.js";
import mongoose from "mongoose";


export const createTodoController = async (req, res) => {
    try {
        const { title, category, dueDate } = req.body;
        const { userId } = req.params
        if (!title) {
            return res.status(400).json({
                status: false,
                error: "title is required"
            })
        }

        if (!category) {
            return res.status(400).json({
                status: false,
                error: "category is required"
            })
        }
        const isexist = await TodoModel.findOne({ title })
        if (isexist) {
            return res.status(400).json({
                status: false,
                error: "todo already exists"
            })
        }

        const todo = await TodoModel.create({
            title,
            category,
            dueDate: moment().format("YYYY-MM-DD"),
        });

        // -------------find user by id --------------
        const user = await UserModel.findById({ _id: userId })
        if (!user) {
            return res.status(400).json({
                status: false,
                error: "user not found"
            })
        }

        user.todos.push(todo._id)
        await user.save()

        res.status(201).json({
            status: true,
            message: "todo created successfully",
            todo,
            user
        });


    } catch (error) {
        customConsole("🚀 ~ file: todoConroller.js:58 ~ createTodoController ~ error:", error)
        res.status(500).json({
            status: false,
            error: "Internal server error",
            error: error.message
        });
    }
}


// -----------get all todo controller--------------

export const getAllTodoController = async (req, res) => {
    try {
        const { userId } = req.params

        if (!userId) {
            return res.status(400).json({
                status: false,
                error: "userId is required"
            })
        }

        const user = await UserModel.findById({ _id: userId }).populate("todos")

        if (!user) {
            return res.status(400).json({
                status: false,
                error: "user not found"
            })
        }
        return res.status(200).json({
            status: true,
            message: "todo found successfully",
            total: user.todos.length,
            todo: user.todos
        });

    } catch (error) {
        customConsole("🚀 ~ file: todoConroller.js:97 ~ getAllTodoController ~ error:", error)
        res.status(500).json({
            status: false,
            error: "Internal server error",
            error: error.message
        });
    }
}

// -------- --- complete todo controller--------------

export const updateAllTodoController = async (req, res) => {
    try {
        const { todoId } = req.params
        const updataTodo = await TodoModel.findByIdAndUpdate(todoId, { status: "complete" }, { new: true })

        if (!updataTodo) {
            return res.status(400).json({
                status: false,
                error: "Todo not found"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Todo updated successfully",
            updataTodo
        })
    } catch (error) {
        customConsole("🚀 ~ file: todoConroller.js:125 ~ updateAllTodoController ~ error:", error)
        res.status(500).json({
            status: false,
            error: "Internal server error",
            error: error.message
        });
    }
}


// --------------pending todo controller--------------

export const pendingAllTodoController = async (req, res) => {
    try {
        const { todoId } = req.params

        const pendingTodo = await TodoModel.findByIdAndUpdate(todoId, { status: "pending" }, { new: true })

        if (!pendingTodo) {
            return res.status(400).json({
                status: false,
                error: "Todo not found"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Todo updated successfully",
            pendingTodo
        })

    } catch (error) {
        console.log("🚀 ~ file: todoConroller.js:156 ~ pendingAllTodoController ~ error:", error)
        res.status(500).json({
            status: false,
            error: "Internal server error",
            error: error.message
        });
    }
}


export const getCompleteAllTodoController = async (req, res) => {
    try {
        const { date } = req.params

        // const completeTodo = await TodoModel.find({})
        const completeTodo = await TodoModel.find({
            status: "complete", createdAt: {
                $gte: new Date(`${date}T00:00:00.000Z`),
                $lt: new Date(`${date}T23:59:59.9999Z`)
            }
        }).exec()

        if (!completeTodo) {
            return res.status(400).json({
                status: false,
                error: "Todo not found"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Todo get successfully",
            count: completeTodo.length,
            completeTodo
        })


    } catch (error) {
        console.log("🚀 ~ file: todoConroller.js:193 ~ getCompleteAllTodoController ~ error:", error)
        res.status(500).json({
            status: false,
            error: "Internal server error",
            error: error.message
        });
    }
}


export const AllTodoCountController = async (req, res) => {
    try {


        const { userId } = req.params


        const user = await UserModel.findById({ _id: userId }).populate("todos")



        if (!user) {
            return res.status(400).json({
                status: false,
                error: "complete todo not found"
            })
        }

        return res.status(200).json({
            // status: true,
            // message: "Todo count successfully",
            user: user.todos
        })


    } catch (error) {
        console.log("🚀 ~ file: createTodoController.js:231 ~ AllTodoCountController ~ error:", error)
        return res.status(500).json({
            status: false,
            error: "Internal Server Error",
            error: error
        })
    }
}