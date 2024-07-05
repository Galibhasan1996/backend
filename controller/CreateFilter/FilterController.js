import filterModel from "../../model/FilterMedel/FilterModel.js"
import { customConsole } from "../../util/constent/Constent.js"


export const createFilterController = async (req, res) => {
    try {
        const { title } = req.body

        if (!title) {
            return res.status(500).json({
                status: false,
                error: "title is required",
            })
        }
        const filter = await filterModel.findOne({ title })
        if (filter) {
            return res.status(500).json({
                status: false,
                error: "filter already exists",
            })
        }
        const newFilter = await filterModel.create({ title })

        return res.status(201).json({
            status: true,
            message: "filter created successfully",
            newFilter
        })

    } catch (error) {
        customConsole("🚀 ~ file: FilterController.js:31 ~ createFilterController ~ error:", error)
        return res.status(500).json({
            status: false,
            error: "Internal Server Error",
            error: error.message
        })

    }
}

// ----------get all filter controller------------

export const getAllFilterController = async (req, res) => {
    try {
        const allFilter = await filterModel.find({})
        if (!allFilter) {
            return res.status(500).json({
                status: false,
                error: "No filter found",
            })
        }
        return res.status(200).json({
            status: true,
            message: "all filter find successfully",
            totalFilter: allFilter.length,
            allFilter
        })

    } catch (error) {
        customConsole("🚀 ~ file: FilterController.js:60 ~ getAllFilterController ~ error:", error)
        return res.status(500).json({
            status: false,
            error: "Internal Server Error",
            error: error.message
        })
    }
}



// ---------delete filter controller----------------


export const deleteFilterController = async (req, res) => {
    try {
        const { _id } = req.params

        if (!_id) {
            return res.status(400).json({
                status: false,
                error: "id is required"
            })
        }

        const filter = await filterModel.findByIdAndDelete({ _id })

        if (!filter) {
            return res.status(400).json({
                status: false,
                error: "filter not found"
            })
        }

        return res.status(200).json({
            status: true,
            message: "filter deleted successfully",
            filter
        })

    } catch (error) {
        customConsole("🚀 ~ file: FilterController.js:101 ~ deleteFilterController ~ error:", error)
        return res.status(500).json({
            status: false,
            error: "Internal Server Error",
            error: error.message
        })
    }
}