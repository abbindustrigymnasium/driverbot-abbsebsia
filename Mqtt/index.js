const express = require('express')

var bodyParser = require('body-parser')
const mqtt = require('mqtt')
var options = {
    host: 'maqiatto.com',
    port: 1883,
    username: 'sebastian.sialis@abbindustrigymnasium.se',
    password: 'helle1234'
}
var client = mqtt.connect(options)
var app = express()
app.use(bodyParser.json())
const port = 5500
const io = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const socket = new Server(server)
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/main.html")
})
client.on('connect', function () {
    console.log('Connected')
    client.subscribe('sebastian.sialis@abbindustrigymnasium.se/drive')
})
client.on('message', function (topic, message) {
    console.log(parseInt(message.toString()), topic)
    socket.emit('speed', parseInt(message.toString()))
})
socket.on('connection', (socket) => {
    socket.on('data', function (data) {
        console.log(data)
            client.publish('sebastian.sialis@abbindustrigymnasium.se/drive', (data.speed.toString()))
            client.publish('sebastian.sialis@abbindustrigymnasium.se/servo', (data.turning.toString()))
    })
})
app.get('/files/:file', (req, res) => {
    const file = req.params.file
    res.sendFile(__dirname + '/' + file)
})
server.listen(port, () => console.log(`Listening on port ${port}`))
