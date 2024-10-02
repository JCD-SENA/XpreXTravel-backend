//Librerias externas
const mysql = require("mysql") //Duh
const fs = require("fs") //Maneja archivos (leer, escribir, borrar, crear)
const express = require('express')
const arguments = require("process").argv //Los argumentos del terminal, esto es para la ejecución

//Librerias internas
const loginEndPoint = require("./src/routes/login")

let protocol = null

const server = express();
const localMode = arguments[2] == "local"

//Lee el contenido de configuración del host
fs.readFile("src/config/host.json", (error, hostDataBuffer) => {
	const hostData = JSON.parse(hostDataBuffer.toString())

	server.get("/", (req, res) => {
		res.status(400)
	})

	server.post("/login", (req, res) => {
		console.log("Request: "+req.body)
		res.json({})
	})

	server.listen(hostData.port, () => {
		console.log("http://"+hostData.host+":"+hostData.port)
	})
})