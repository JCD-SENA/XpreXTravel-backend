/*
	Se procesa la información enviada al endpoint de login.
	Si el request es valido entonces devuelve los datos del usuario, pero si no lo es o ocurre algún error entonces es false
*/

import { checkIfInjection } from "../controller/databaseHandler.js"

export default (con, req, finish, error) => {
	if ((req.password == undefined || req.email == undefined) || req.password.length < 1 || req.email.length < 1) { //En caso de que el request del login no tenga la información correcta, entonces es invalido
		error()
		return null
	} else {
		//idUsers, profile_picture, names, last_names, email, password, role
		if (checkIfInjection(req.password) || checkIfInjection(req.email)) {
			console.log("Se intentó realizar una inyección de SQL")
			error()
			return null
		} else {
			con.query(`SELECT password, email FROM users WHERE password="${req.password}" AND email="${req.email}"`, (err, res) => {
				if (err) {
					console.log(err)
					error()
					return null
				}
				if (res.length > 0) {
					con.query(`SELECT idUsers, profile_picture, names, last_names, role FROM users WHERE password="${req.password}" AND email="${req.email}"`, (errUser, resUser) => {
						if (errUser) {
							console.log(errUser)
							error()
							return null
						}
						finish(resUser[0])
					})
				} else {
					console.log("Información de logging invalida")
					error()
					return null
				}
			})
		}
	}
}