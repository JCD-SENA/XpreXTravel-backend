import mysql from "mysql"
import { readFile } from "fs"
import { error } from "console"

class databaseHandler {
	constructor(callBack) {
		readFile("src/config/server-config.json", (errorServerData, serverInfoBuffer) => {
			this.serverInfo = JSON.parse(serverInfoBuffer)
			this.connection = mysql.createConnection(this.serverInfo);
			this.start(callBack)
		})
	}

	start (callBack) {
		this.connection.connect((errorConnection) => {
			if (errorConnection) {
				console.log(errorConnection)
			} else {
				callBack(this.connection)
			}
		})
	}
}

function checkIfInjection(txt) {

}

export {databaseHandler, checkIfInjection}