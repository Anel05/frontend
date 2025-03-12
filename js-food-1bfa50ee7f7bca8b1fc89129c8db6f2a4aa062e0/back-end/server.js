const express = require('express')
const cors = require('cors')
const app = express()
const userRouter = require('./routes/auth') // Используй эту переменную в app.use

app.use(express.json())
app.use(cors())
app.use('/api/auth', userRouter) // Здесь должно быть userRouter (не routes)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})
