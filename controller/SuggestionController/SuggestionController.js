import suggestionModel from "../../model/SuggestionModel/Suggestion.js"
import { customConsole } from "../../util/constent/Constent.js"


// -------------create suggestion
export const createSuggestionController = async (req, res) => {
    try {
        const { title } = req.body

        if (!title) {
            return res.status(400).json({
                status: false,
                error: "suggestion is required"
            })
        }

        const suggestion = await suggestionModel.findOne({ title })

        if (suggestion) {
            return res.status(400).json({
                status: false,
                error: "suggestion already exists"
            })
        }

        const newSuggestion = await suggestionModel.create({
            title
        })

        return res.status(200).json({
            status: true,
            message: "suggestion created successfully",
            newSuggestion
        })

    } catch (error) {
        customConsole("🚀 ~ file: SuggestionController.js:37 ~ createSuggestionController ~ error:", error)
        return res.status(500).json({
            status: false,
            error: "Internal Server Error",
            error: error.message
        })
    }
}

// ------------delete suggestion----------------

export const deleteSuggestionController = async (req, res) => {
    try {
        const { _id } = req.params

        if (!_id) {
            return res.status(400).json({
                status: false,
                error: "id is required"
            })
        }

        const suggestion = await suggestionModel.findByIdAndDelete({ _id })
        if (!suggestion) {
            return res.status(400).json({
                status: false,
                error: "suggestion not found"
            })
        }

        return res.status(200).json({
            status: true,
            message: "suggestion deleted successfully",
            suggestion
        })



    } catch (error) {
        console.log("🚀 ~ file: SuggestionController.js:75 ~ deleteSuggestionController ~ error:", error)
        return res.status(500).json({
            status: false,
            error: "Internal Server Error",
            error: error.message
        })
    }
}

// ---------------get all suggestion ------------

export const getAllSuggestionController = async (req, res) => {
    try {

        const allSuggestion = await suggestionModel.find({})

        if (!allSuggestion) {
            return res.status(400).json({
                status: false,
                error: "No suggestion found"
            })
        }
        return res.status(200).json({
            status: true,
            message: "all suggestion find successfully",
            totalSuggestion: allSuggestion.length,
            allSuggestion
        })
    } catch (error) {
        console.log("🚀 ~ file: SuggestionController.js:105 ~ getAllSuggestionController ~ error:", error)
        return res.status(500).json({
            status: false,
            error: "Internal Server Error",
            error: error.message
        })
    }
}