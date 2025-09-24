const express = require('express')

const categoryRoute = require('./routes/categoryRoute')
const brandRoute = require('./routes/brandRoute')
const productRoute = require('./routes/productRoute')
const app = express()
const port = 7000

app.get('/', (req, res) => res.send('Hello World!'))


app.use('/category', categoryRoute)
app.use('/brand', brandRoute)
app.use('/product', productRoute)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))