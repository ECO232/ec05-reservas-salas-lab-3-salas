
const z = require('zod')

const userSchema = z.object({
    id: z.number({
        invalid_type_error: 'Sala id must be a Number',
        required_error: 'Sala id is required'
    }).int().min().max(10),
    name: z.string({
        invalid_type_error: 'User name must be a String',
        required_error: 'User name is required'
    }),
    last: z.string({
        invalid_type_error: 'User last must be a String',
        required_error: 'User last is required'
    }).default("Unknown"),
})

function validateUser(obj) {
    return userSchema.safeParse(obj); // safeParse vs parse
}

module.exports = {
    validateUser
}