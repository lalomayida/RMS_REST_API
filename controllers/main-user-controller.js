const userController = require('../controllers/user-controller');
module.exports = {
    get_user_information: async (req, res) => {
        console.log("Start process get_user_information")
        let userInformation = await userController.get_user_information(req.query.id)
        let userRole = await userController.get_user_role(req.query.id)

        let response = {}
        response = userInformation.data
        response.role = userRole.data

        console.log("Success in get_user_information")
        res.send({
            status: 'success',
            data: response
        })
    },
    get_user_token: async (req, res) => {
        console.log("Start process get_user_token")
        const jwt = require("jsonwebtoken")
        const jwtKey = "my_secret_key"
        const jwtExpirySeconds = 300

        let userValidation = await userController.get_user_token(req.body.email, req.body.password)

        if (userValidation.status == 'error') {

            if (userValidation.error) {

                console.log("Failure in get_user_token, user not authenticated")
                res.send({
                    data: {
                        errors: 400
                    }
                })
            }
        }
        else if (userValidation.status == 'success') {
            let userId = await userController.get_user_id_email(req.body.email)
            let userInformation = await userController.get_user_information(userId.data.id)
            let userRole = await userController.get_user_role(userId.data.id)
            let response = {}
            response = userInformation.data
            response.role = userRole.data

            const token = jwt.sign(response, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds * 1000,
            })

            console.log("Success in get_user_token, user authenticated")
            res.send({
                token: token
            })
        }
    }
}