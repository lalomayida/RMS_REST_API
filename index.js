const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const apiRoutes = require('./routes/rms-api-routes.js')

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials",true)
    next();
});

app.use(express.static('../client'))
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

let auth = (req, res, next) => {
    next();
}

app.use('/api', auth, apiRoutes);
app.get('/', (req, res) => res.send('RMS rest-API'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})