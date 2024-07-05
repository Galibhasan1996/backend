import express from 'express'
import { createSuggestionController, deleteSuggestionController, getAllSuggestionController } from '../../controller/SuggestionController/SuggestionController.js'

const route = express.Router()

// ----------create suggestion--------------
route.post("/create-suggestion", createSuggestionController)

// ------------delete suggestion----------------

route.delete("/delete-suggestion/:_id", deleteSuggestionController)
// -----------get all suggestin ------------
route.get("/get-all-suggestion", getAllSuggestionController)























export default route