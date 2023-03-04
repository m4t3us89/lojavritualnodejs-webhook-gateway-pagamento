import express from 'express'
const app = express()

app.use(express.json());

app.get('/', function (req, res) {
  res.status(200).json({
    ok: true
  })
})

app.listen(3000)