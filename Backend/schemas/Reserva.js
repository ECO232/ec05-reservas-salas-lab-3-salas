const z = require('zod')

const reservationSchema = z.object({
    id: z.string({
        invalid_type_error: 'Reservation id must be a String',
        required_error: 'Reservation id is required'
    }),
    name: z.string({
        invalid_type_error: 'User name must be a String',
        required_error: 'User name is required'
    }),
    last: z.string({
        invalid_type_error: 'User last must be a String',
        required_error: 'User last is required'
    }).default("Unknown"),
    tiempo: z.number({
        invalid_type_error: 'Reservation time must be a Number',
        required_error: 'Reservation time is required'
    }).int().min(7).max(18),
})

function validateReserva(obj) {
    return reservationSchema.safeParse(obj); // safeParse vs parse
}

module.exports = {
    validateReserva
}