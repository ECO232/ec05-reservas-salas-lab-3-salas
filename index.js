const express = require('express')
const app = express()
const port= 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let salaEstudio = []

salaEstudio.push({
        id: 1,
        Tiempo: "7am-7pm",
    },{
        id: 2,
        Tiempo: "7am-7pm",
    },{
        id: 3,
        Tiempo: "7am-7pm",
    },{
        id: 4,
        Tiempo: "7am-7pm",
    })
