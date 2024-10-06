//Librerias externas
import { readFile } from "fs"
import { argv } from "process"
import mysql from "mysql"
import express from "express"
import bodyParse from "body-parser"

//Librerias internas
import { databaseHandler } from "./src/controller/databaseHandler.js"
import endpointCoordinator from "./src/controller/endpointCoordination.js"
import login from "./src/routes/login.js"
import jwtHandler from "./src/controller/jwtHandler.js"

let protocol = null

const server = express()
const localMode = argv[2] == "local"
const urlParse = bodyParse.urlencoded({ extended: false })

//Lee el contenido de configuración del host
const db = new databaseHandler(
	(connection) => {
		readFile("src/config/host.json", (errorHostData, hostDataBuffer) => {
			const hostData = JSON.parse(hostDataBuffer.toString())
			const jwt = new jwtHandler(hostData)
			const invalidMessage = (res) => {res.status(400).send("No se puede realizar este request.")}
			const epc = new endpointCoordinator(connection)
	
			//Gets
			server.get("/", (req, res) => {
				invalidMessage(res)
			})
	
			//Posts
			server.post("/", (req, res) => {
				invalidMessage(res)
			})
	
			server.post("/login", urlParse, (req, res) => {
				epc.loginEndpoint(req.body, (loginData) => {
					jwt.sendJWTData(res, loginData)
				}, () => {
					invalidMessage(res)
				})
			})
	
			server.listen(hostData.port, () => {
				console.log("http://"+hostData.host+":"+hostData.port)
			})
		})
	}
)