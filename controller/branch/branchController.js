const e = require("express")
const { createBranchModel } = require("../../model/branch/branchModel")



async function branchController(req, res) {
    const branchData = req.body

    try {
        const result = await createBranchModel(branchData)
        if (result.success) {
            res.status(200).json({ message: "branch successfully created", insertId: result.insertId })
        } else {
            res.status(500).json({ message: result.message })
        }
    } catch (error) {
        if (error.message === "Duplicate entry for branch ID") {
            res.status(409).json({ message: 'Duplicate entry, ensure the ID is unique' })
        }else if(error.message === "Entry with the same location and name already exists"){
            res.status(422).json({message:"Branch with the same location and name already exists"})
        }
        else{
            console.log("Internal Server Error", error)
            res.status(500).json({ error: "Internal Server Error" })
        }
       
    }
}

module.exports = { branchController }