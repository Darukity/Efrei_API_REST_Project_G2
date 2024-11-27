const { Validator } = require('jsonschema');

module.exports = {
    validateRecommendation: (data) => {
        const validator = new Validator();
        const schema = {
            type: 'object',
            properties: {
                cvId: {
                    type: 'string',
                    minLength: 24,
                    maxLength: 24,
                    errorMessage: 'CV ID should be a valid ObjectId.',
                },
                userId: {
                    type: 'string',
                    minLength: 24,
                    maxLength: 24,
                    errorMessage: 'User ID should be a valid ObjectId.',
                },
                comment: {
                    type: 'string',
                    minLength: 1,
                    errorMessage: 'Comment is required.',
                },
            },
            required: ['cvId', 'userId', 'comment'],
        };

        let result = validator.validate(data, schema);

        if (result.errors.length) {
            let errorMessages = result.errors.map(error => error.message).join(', ');
            return { message: errorMessages };
        }
        return null;
    },
};
