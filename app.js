//Librerias externas
const mysql = require("mysql") //Duh
const fs = require("fs") //Maneja archivos (leer, escribir, borrar, crear)
const arguments = require("process").argv //Los argumentos del terminal, esto es para la ejecución

//Librerias internas
const loginEndPoint = require("./src/routes/login")

let protocol = null

const localMode = arguments[2] == "local"

if (!localMode)
	protocol = require("https")
else
	protocol = require("http")

//Lee el contenido de configuración del host
fs.readFile("src/config/host.json", (error, hostDataBuffer) => {
	const hostData = JSON.parse(hostDataBuffer.toString())

	const server = protocol.createServer((req, res) => {
		//Header
		res.setHeader("Content-Type", "application/json");
		req.setEncoding("utf8")
		//Body
		if (req.method == "POST") {
			switch (req.url) {
				case "/login":
					loginEndPoint(req)
					break
				default:
					res.error("400")
					break
			}
		} else if (req.method == "GET") {
			res.write("{}")
		}
		res.end()
	});

	server.listen(hostData.port, hostData.host, () => {
		console.log("http://"+hostData.host+":"+hostData.port)
	})
})