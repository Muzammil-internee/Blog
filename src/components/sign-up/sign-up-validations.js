const registerOptions = {
    name: {
        required: true,
        minLength: 4,
        maxLength: 15,
        pattern: /^[a-zA-z]+([\s][a-zA-Z]+)*$/,
    },
    email: {
        required: true,
        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    },
    phone: {
        required: true,
        pattern: /(0|9)\d{10}$/,
    },
    password: {
        required: true,
        minLength: 4,

    }
}
export default registerOptions;