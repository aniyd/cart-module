/**
 * Parent class for commonly used method while doing data validation.
 */
import Joi from 'joi';

import HttpException from './../../middleware/error-handling/http-exception';

export default class Validators {

    /**
     * Method to parse the validation result and throw error/errors if any.
     * @param {Joi.ValidationResult} result
     * @returns {void}
     */
    private static parseValidationResult(result: Joi.ValidationResult): void {
        const errorMessage: string[] = [];
        if (result.error && result.error.details) {
            result.error.details.forEach((detail: Joi.ValidationErrorItem) => {
                errorMessage.push(detail.message);
            });
            throw new HttpException(400, JSON.stringify(errorMessage));
        }
    }

    /**
     * Method that performs the validation of fields in the provided value
     * against the schema definition and throws error if validation fails.
     * @param {Joi.ObjectSchema} schema
     * @param {any} value
     * @returns {any}
     */
    protected static validateData(schema: Joi.ObjectSchema, value: any): any {
        const result: Joi.ValidationResult = schema.validate(value, { abortEarly: false });
        Validators.parseValidationResult(result);
        return result.value;
    }

}