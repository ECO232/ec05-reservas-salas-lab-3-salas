const express = require('express')
const app = express()
const port= 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const {validateSala} = require('./schemas/Sala')
const {validateUser} = require('./schemas/user')

let salaEstudio = []
salaEstudio.push({
    id: 1,
    Tiempo: "7",
    Ubicación: "Edificio C",
},{
    id: 2,
    Tiempo: "9",
    Ubicación: "Edificio D",
},{
    id: 3,
    Tiempo: "11",
    Ubicación: "Edificio E",
},{
    id: 4,
    Tiempo: "13",
    Ubicación: "Edificio F",
})

let user = []
user.push({
    id: "",
    name: "",
    last: "",
})

let Reserva = []
for (i=1;i<=4;i++) {
    let newreserva = {
        id: null,
        name: null,
        last: null,
        tiempo: i,

    }

    Reserva.push(newreserva);

  }




app.get('/salaEstudio/:id', (req, res)=>{
    console.log("params:", req.params)
    const requestID = req.params.id
    let requiredSala = null;
    for (let index = 0; index < salaEstudio.length; index++) {
        console.log(salaEstudio[index].id === requestID, salaEstudio[index].id, requestID)
        if(salaEstudio[index].id === requestID){
            requiredSala = salaEstudio[index];
        }
    }
    console.log(requiredSala)
    res.json(requiredSala)
})


app.get('/salaEstudio', (req, res)=>{
    if(req.query.Ubicacion){
        salaEstudio = salaEstudio.filter(
            (sala)=>{return sala.Ubicacion == req.query.Ubicacion}
        )
    }
    res.send({"salaEstudio":salaEstudio})
})

app.post('/salaEstudio', (req, res) => {

    const SalaValidation = validateSala(req.body)
    console.log("result", SalaValidation.error)

    if(SalaValidation.error){
        return res.status(400).send(
            {message:JSON.parse(SalaValidation.error.message)}
        )
    }

    let newsalaEstudio = {
        id:SalaValidation.data.id,
        Tiempo:SalaValidation.data.Tiempo,
        Ubicacion:SalaValidation.data.Ubicacion,

    }
    salaEstudio.push(newsalaEstudio)
    res.status(201).send({"message":"Sala disponible", "sala":newsalaEstudio})
})

app.get('/', (req, res)=>{
    res.send("Bienvenidos")
})

app.delete('/salaEstudio/:id', (req, res)=>{
    const idToDelete = req.params.id;
    let indexToDelete = salaEstudio.findIndex(sala=>sala.id==idToDelete)
    let salaDeleted = salaEstudio.splice(indexToDelete, 1)
    //console.log("user delete: ", userDeleted)
    res.send("Se eliminó correctamente el usuario con id: " + salaDeleted[0].id)
})

app.put('/salaEstudio/:id',(req, res)=>{
    let index = salaEstudio.findIndex(sala => sala.id == req.params.id)
    let newsalaEstudio = {
        id:SalaValidation.data.id,
        Tiempo:SalaValidation.data.Tiempo,
        Ubicacion:SalaValidation.data.Ubicacion,
    }
    salaEstudio[index]=newsalaEstudio
    res.send("usuario reemplazado " + newsalaEstudio )
})

app.patch('/salaEstudio/:id', (req, res)=>{
    let index = salaEstudio.findIndex(user => sala.id == req.params.id)

    /* A pie 🦶*/
    //users[index].name = req.body.name || users[index].name
    //users[index].last = req.body.last || users[index].last
    //users[index].age = req.body.age || users[index].age
    //users[index].email = req.body.email || users[index].email

    /* Para generalizarlo ⭐*/
    if (index !== -1) {
        // Obtén las claves del cuerpo de la solicitud
        const requestKeys = Object.keys(req.body);
        // Itera sobre las claves y verifica si existen en el objeto
        requestKeys.forEach(key => {
            if (salaEstudio[index][key] !== undefined) {
                salaEstudio[index][key] = req.body[key];
            }
        });
        res.send("Usuario modificado para las claves: " + requestKeys.join(', '));
    } else {
        res.status(404).send("Usuario no encontrado");
    }
});

app.use("", (req, res)=>{
    res.status(404).send("No encontramos el recurso solicitado")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




