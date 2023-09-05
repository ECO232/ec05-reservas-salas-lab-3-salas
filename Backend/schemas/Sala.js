
const z = require('zod')

const salaSchema = z.object({
    id: z.number({
        invalid_type_error: 'Sala id must be a Number',
        required_error: 'Sala id is required'
    }).int().min(1).max(5),
    place: z.string({
        invalid_type_error: 'The building must  contain a number',
        required_error: 'The ubication is required'
    }).default("Unknown"),
    reservado: z.number({
        invalid_type_error: 'Sala lap-time must be a Number',
        required_error: 'Sala lap-time is required'
    }),
})
    function validateSala(obj) {
    return salaSchema.safeParse(obj); // safeParse vs parse
}

module.exports = {
        validateSala
    }