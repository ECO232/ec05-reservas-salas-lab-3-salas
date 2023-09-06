const express = require('express')
const app = express()
const port= 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require ('cors');
app.use(cors())

const {validateSala} = require('./schemas/Sala')

const {validateReserva} = require('./schemas/Reserva')
const {validateUser} = require('./schemas/user')

let Reserva = []
for (i=7;i<=18;i++) {
    let newreserva = {
        id: null,
        name: null,
        last: null,
        tiempo: i,
    }
    Reserva.push(newreserva);}

let salaEstudio = []
for (i=1;i<=5;i++) {
    let SalaDescrip = {
        id: i,
        place: `Edificio ${i}`,
        reservado: Reserva
    }
    salaEstudio.push(SalaDescrip);}

let user = []
user.push({
    id: "",
    name: "",
    last: "",
})





    app.get('/', (req, res)=>{
        res.send("Bienvenidos")
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })


//************Usar el post para user */

    app.get('/user', (req, res)=>{
        res.send("user:", user)
    })

    app.post('/user', (req, res) => {

        const userValidation = validateUser(req.body)
        console.log("result", userValidation.error)

        if(userValidation.error){
            return res.status(400).send(
                {message:JSON.parse(userValidation.error.message)}
            )
        }

        let newsuser = {
            id:userValidation.data.id,
            name:userValidation.data.name,
            last:userValidation.data.last,

        }
        user.push(newsuser)
        res.status(201).send({"message":"Usuario", "users":newsuser})
    })


    app.delete('/user/:id', (req, res)=>{
        const idToDelete = req.params.id;
        let indexToDelete = user.findIndex(users=>users.id==idToDelete)
        let userDeleted = user.splice(indexToDelete, 1)
        //console.log("user delete: ", userDeleted)
        res.send("Se eliminó  el usuario con id: " + userDeleted[0].id)
    })


/////Salita

    app.get('/salaEstudio', (req, res)=>{
        res.send("salaEstudio:", salaEstudio)
    })


//ls para ver que hay en el proyecto, cd para cambiar de carpeta.

app.put('/salaEstudio/:id',(req, res)=>{
    let index = salaEstudio.findIndex(sala => sala.id == req.params.id)
    let newsalaEstudio = {
        id:req.body.id,
        Tiempo:req.body.Tiempo,
        Ubicacion:req.body.Ubicacion,
    }
    salaEstudio[index]=newsalaEstudio
    res.send("usuario reemplazado " + newsalaEstudio )
})




//////la reserva


app.get('/Reserva', (req, res)=>{
    res.send("Reserva:", Reserva)
})




/* app.patch('/salaEstudio/:id', (req, res)=>{
    let index = salaEstudio.findIndex(user => sala.id == req.params.id)

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
 */





