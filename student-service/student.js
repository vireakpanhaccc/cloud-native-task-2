const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.post("/submitassignment", (req,res) => {
    const { assignment, content } = req.body
    res.json({
        message: `Assignment "${assignment}" submitted successfully`,
        assignment,
        content
    })
})

app.get("/viewassignment", (req, res) => {
    const { assignment } = req.query
    res.json({
        message: `Searching for assignment "${assignment}"`,
        student: {
            assignment
        }
    })
})
app.put("/updateprofile", (req, res) => {
    const { name, password } = req.body
    res.json({
        message: `Student "${name}" profile updated`,
        name
    })
})

app.listen(port, () => {
    console.log(`Student service is running on port ${port}`)
})