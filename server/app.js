"use strict"; //use es2015 without node generating errors/warnings

let express = require('express')
let app = express()

app.use( express.static(__dirname + "/../client"))

app.get('/landing', (request, response ) => {
    response.json("The Weaning Protocol")
})

app.listen(8181, () => console.log('listening on 8181'))