const express = require('express')
const app = express()
const port = 3001

app.use(express.json())
app.post("/addassignment", (req,res) => {
    const { assignment } = req.body
    res.json({
        message: `Assignment "${assignment}" added`,
        assignment
    })
})

app.get("/searchstudent", (req, res) => {
    const { name } = req.query
    res.json({
        message: `Searching for student "${name}"`,
        student: {
            name,
            grade: "A"
        }
    })
})
app.delete("/removeassignment", (req, res) => {
    const { assignment } = req.body
    res.json({
        message: `Assignment "${assignment}" removed`,
        assignment
    })
})

app.listen(port, () => {
    console.log(`Teacher service is running on port ${port}`)
})