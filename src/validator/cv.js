const { Validator } = require('jsonschema');

module.exports = {
    verifyCv: (cv) => {
        let validator = new Validator();

        // Define the schema for a CV
        let cvSchema = {
            type: 'object',
            properties: {
                personalInfo: {
                    type: 'object',
                    properties: {
                        firstName: {
                            type: 'string',
                            minLength: 5,
                            maxLength: 50,
                            errorMessage: 'Please enter a first name that is 5 to 50 characters long.',
                        },
                        lastName: {
                            type: 'string',
                            minLength: 5,
                            maxLength: 50,
                            errorMessage: 'Please enter a last name that is 5 to 50 characters long.',
                        },
                        description: {
                            type: 'string',
                            minLength: 5,
                            errorMessage: 'Please provide a description that is at least 5 characters long.',
                        },
                    },
                    required: ['firstName', 'lastName'], // Personal info must have first and last name
                    additionalProperties: false, // No additional fields are allowed in personalInfo
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
                        additionalProperties: false, // No extra fields allowed
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
                        additionalProperties: false, // No extra fields allowed
                    },
                },
                isVisible: {
                    type: 'boolean',
                    default: true, // Default value if not provided
                },
            },
            required: ['personalInfo', 'education', 'experience'], // Mandatory sections in the CV
            additionalProperties: false, // Disallow any other fields outside defined properties
        };

        // Validate the CV against the schema
        let validationResult = validator.validate(cv, cvSchema);

        if (validationResult.errors.length > 0) {
            throw new Error(
                'CV validation failed: ' +
                validationResult.errors.map((error) => error.stack).join(', ')
            );
        }

        return true; // If validation passes, return true
    },
};
