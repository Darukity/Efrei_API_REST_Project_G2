const { Validator } = require('jsonschema');

module.exports = {
    verifyCv: (cv) => {
        let validator = new Validator();

        let cvSchema = {
            type: 'object',
            properties: {
                userId: { type: 'string' },
                personalInfo: {
                    type: 'object',
                    properties: {
                        firstName: {
                            type: 'string',
                            minLength: 3,
                            maxLength: 50,
                            errorMessage: 'Please enter a first name that is 3 to 50 characters long.',
                        },
                        lastName: {
                            type: 'string',
                            minLength: 3,
                            maxLength: 50,
                            errorMessage: 'Please enter a last name that is 3 to 50 characters long.',
                        },
                        description: {
                            type: 'string',
                            minLength: 5,
                            errorMessage: 'Please provide a description that is at least 5 characters long.',
                        },
                    },
                    required: ['firstName', 'lastName'], 
                    additionalProperties: false, 
                },
                education: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            degree: {
                                type: 'string',
                                minLength: 2,
                                errorMessage: 'Degree must be at least 2 characters long.',
                            },
                            institution: {
                                type: 'string',
                                minLength: 2,
                                errorMessage: 'Institution name must be at least 2 characters long.',
                            },
                            year: {
                                type: 'integer',
                                minimum: 1900,
                                maximum: new Date().getFullYear(),
                                errorMessage: 'Year must be a valid year (1900 or later).',
                            },
                        },
                        required: ['degree', 'institution', 'year'],
                        additionalProperties: false, 
                    },
                },
                experience: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            jobTitle: {
                                type: 'string',
                                minLength: 2,
                                errorMessage: 'Job title must be at least 2 characters long.',
                            },
                            company: {
                                type: 'string',
                                minLength: 2,
                                errorMessage: 'Company name must be at least 2 characters long.',
                            },
                            years: {
                                type: 'integer',
                                minimum: 0,
                                maximum: 50,
                                errorMessage: 'Years must be between 0 and 50.',
                            },
                        },
                        required: ['jobTitle', 'company', 'years'],
                        additionalProperties: false, 
                    },
                },
                isVisible: {
                    type: 'boolean',
                    default: true, 
                },
                createdAt: {
                    type: 'string',
                },
                updatedAt: {
                    type: 'string',
                }
            },
            required: ['personalInfo', 'education', 'experience'], 
            additionalProperties: false, 
        };

        let result = validator.validate(cv, cvSchema);

        if (Array.isArray(result.errors) && result.errors.length) {
            let failedInputs = '';

            result.errors.forEach((error) => {
                failedInputs += (error.schema.errorMessage || error.message) + ', ';
            });
            return {
                message: failedInputs
            };
        }
    }
};
