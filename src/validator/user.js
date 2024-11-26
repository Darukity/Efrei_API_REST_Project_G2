const { Validator } = require('jsonschema');

module.exports = {
    verifyUser: (user) => {
        let validator = new Validator();
        let userSchema = {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 20,
                    errorMessage: 'User name is missing or incorrect'
                },
                email: {
                    type: 'email',
                    format: 'email',
                    errorMessage: 'User email is missing or incorrect'
                },
                password: {
                    type: 'string',
                    minLength: 6,
                    errorMessage: "User's password, must contain at least one uppercase letter and one digit",
                    pattern: '^(?=.*[A-Z])(?=.*[0-9]).+$'
                }
            },
            required: ['name', 'email', 'password']
        };
        let result = validator.validate(user, userSchema);

        // console.log('error => ', result)
        // if validation failed
        if (Array.isArray(result.errors) && result.errors.length) {
            let failedInputs = '';

            result.errors.forEach((error) => {
                failedInputs += (error.schema.error || error.message) + ', ';
            });
            return {
                message: failedInputs
            };
        }
    }
};
