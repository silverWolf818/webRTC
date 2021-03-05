const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

const serveIndex = require('serve-index')
const express = require('express')

const app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use(serveIndex(path.join(__dirname, './public'), {'icons': true}))
app.use(express.static(path.join(__dirname, './public')))

const options = {
    key: fs.readFileSync(path.join(__dirname, './cert/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './cert/cert.pem'))
}

https.createServer(options, app).listen(443, () => {
    console.log('Https Server listening at port %d', 443)
})

http.createServer(app).listen(8080, () => {
    console.log('Http Server listening at port %d', 80)
})