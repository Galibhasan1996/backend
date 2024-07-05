import express from "express"
import { createFilterController, deleteFilterController, getAllFilterController } from "../../controller/CreateFilter/FilterController.js"


const route = express.Router()



// ----------create filter---------

route.post("/create-filter", createFilterController)

// ------get all filter -------------
route.get("/get-all-filter", getAllFilterController)

// ---------delete filter ----------------

route.delete("/delete-filter/:_id", deleteFilterController)









export default route