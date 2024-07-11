import express from "express"
import { AllTodoCountController, createTodoController, getAllTodoController, getCompleteAllTodoController, pendingAllTodoController, updateAllTodoController } from "../../controller/todoController/todoConroller.js"

const route = express.Router()


// ----------create todo-----------------

route.post("/create-todo/:userId", createTodoController)

// ------------get all todo --------------

route.get("/get-all-todo/:userId", getAllTodoController)


route.patch('/todos/:todoId/complete', updateAllTodoController)

route.patch('/todos/:todoId/pending', pendingAllTodoController)

route.get('/todos/complete/:date', getCompleteAllTodoController)

route.get('/todos/count/:userId', AllTodoCountController)





















export default route
