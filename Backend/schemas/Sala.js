
const z = require('zod')

const salaSchema = z.object({
    id: z.number({
        invalid_type_error: 'Sala id must be a Number',
        required_error: 'Sala id is required'
    }).int().min(1).max(5),
    Tiempo: z.number({
        invalid_type_error: 'Sala lap-time must be a Number',
        required_error: 'Sala lap-time is required'
    }).int().min(7).max(18),
    Ubicacion: z.string({
        invalid_type_error: 'Sala ubication must be correctly formated',
        required_error: 'Sala ubication is required'
}).default("Unknown"),})

function validateSala(obj) {
    return salaSchema.safeParse(obj); // safeParse vs parse
}

module.exports = {
    validateSala
}