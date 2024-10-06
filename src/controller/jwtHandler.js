/*
	Est modulo se encarga de tanto codificar cómo decodificar JWT
*/

import { createSecretKey } from "crypto"
import { SignJWT } from "jose"
import { jwtVerify } from "jose"
import process from "process"

class jwtHandler {
	constructor (hostData) {
		this.hostData = hostData
		this.key = createSecretKey(this.hostData.jwtSecret, "utf-8");
	}

	async sendJWTData(serverResponce, data) {
		console.log(data)
		const jwt  = await new SignJWT(data)
		.setIssuedAt()
		.setProtectedHeader({
			"alg": "HS256"
		})
		//.setIssuer()
		//.setAudience()
		.setExpirationTime("30m")
		.sign(this.key);
		serverResponce.send(jwt)
	}
}

export default jwtHandler