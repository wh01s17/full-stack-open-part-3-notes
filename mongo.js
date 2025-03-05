const mongoose = require('mongoose')

// Verifica que se proporcione la contraseña como argumento en la línea de comandos
if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.pvuql.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)

// Define el esquema para la colección "notes" y los tipos de datos esperados
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

// Define el modelo basado en el esquema, asociado a la colección "notes" en MongoDB
// En el codigo se define en singular "Note", pero en mongo de manera automatica se crea en plural, "notes"
const Note = mongoose.model('Note', noteSchema)

// Crea una nueva instancia del modelo con los datos de la nota
const note = new Note({
    content: 'Mongoose makes things easy',
    important: true,
})

// Guarda la nota en la base de datos y luego cierra la conexión
// note.save()
//     .then(result => {
//         console.log('note saved!')
//         mongoose.connection.close()
//     })

// Obtiene las notas en la base de datos
// El metodo find, recibe por parametros los filtros, si el codigo es Note.find({}), devolvera todas las notas
// Note.find({})
//     .then(result => {
//         result.forEach(note => {
//             console.log(note)
//         })
//         mongoose.connection.close()
//     })

// Devuelve las notas importantes
Note.find({ important: true })
    .then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })

