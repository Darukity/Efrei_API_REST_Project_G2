const { Validator } = require('jsonschema');

const validateReview = (review) => {
    const validator = new Validator();
    const reviewSchema = {
        type: 'object',
        properties: {
            cvId: {
                type: 'string',
                pattern: '^[a-fA-F0-9]{24}$', // MongoDB ObjectId format
                errorMessage: 'cvId is required and must be a valid ObjectId.'
            },
            comment: {
                type: 'string',
                minLength: 1,
                maxLength: 500,
                errorMessage: 'Comment is required and must be between 1 and 500 characters.'
            }
        },
        required: ['cvId', 'comment']
    };

    const result = validator.validate(review, reviewSchema);

    if (Array.isArray(result.errors) && result.errors.length) {
        let failedInputs = '';
        result.errors.forEach((error) => {
            failedInputs += (error.schema.errorMessage || error.message) + ', ';
        });
        return {
            message: failedInputs.slice(0, -2) // Remove trailing comma and space
        };
    }
};

module.exports = {
    validateReview,
};
