const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.post("/studentlogin", (req,res) => {
    const { username, password } = req.body
    res.json({
        message: `Student "${username}" logged in`,
        username
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
app.put("/studentupdateprofile", (req, res) => {
    const { username, password } = req.body
    res.json({
        message: `Student "${username}" profile updated`,
        username
    })
})

app.listen(port, () => {
    console.log(`Student service is running on port ${port}`)
})