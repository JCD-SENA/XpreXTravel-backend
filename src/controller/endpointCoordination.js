import loginEndpoint from "../routes/login.js"

class endpointCoordinator {
	constructor (con) {
		this.connection = con
		this.loginEndpoint = (req, finish, error) => {
			loginEndpoint(con, req, finish, error)
		}
	}
}

export default endpointCoordinator