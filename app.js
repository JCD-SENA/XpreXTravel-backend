//Librerias externas
import mysql from "mysql"
import { readFile } from "fs"
import express from "express"
import bodyParse from "body-parser"
import { argv } from "process"

//Librerias internas
import { databaseHandler } from "./src/controller/databaseHandler.js"
import endpointCoordinator from "./src/controller/endpointCoordination.js"
import login from "./src/routes/login.js"

let protocol = null

const server = express();
const localMode = argv[2] == "local"
const urlParse = bodyParse.urlencoded({ extended: false })

//Lee el contenido de configuración del host
const db = new databaseHandler(
	(connection) => {
		readFile("src/config/host.json", (errorHostData, hostDataBuffer) => {
			const hostData = JSON.parse(hostDataBuffer.toString())
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
					console.log(loginData)
					res.json(loginData)
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