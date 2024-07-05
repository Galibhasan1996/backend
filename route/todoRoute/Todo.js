import express from "express"
import { createTodoController, getAllTodoController, pendingAllTodoController, updateAllTodoController } from "../../controller/todoController/todoConroller.js"

const route = express.Router()


// ----------create todo-----------------

route.post("/create-todo/:userId", createTodoController)

// ------------get all todo --------------

route.get("/get-all-todo/:userId", getAllTodoController)


route.patch('/todos/:todoId/complete', updateAllTodoController)

route.patch('/todos/:todoId/pending', pendingAllTodoController)

// router.get('/todos/complete/:date', getCompleteAllTodoController)

// router.get('/todos/count', AllTodoCountController)





















export default route
