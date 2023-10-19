import { ValidationError } from 'yup';
import RestError from '../http/rest-error';
function getError(err) {
    return {
        message: err.message,
        params: err.params,
    };
}
/**
 * Returns an Error object validating data against a schema
 * @param {Yup} yupSchema - Yup schema with rules
 * @param {object} objData - Data object to validate
 */
export const validate = (yupSchema, objData) => {
    let errorResult = null;
    try {
        yupSchema.validateSync(objData, { abortEarly: false, strict: false, stripUnknown: true });
    }
    catch (err) {
        const errors = [];
        if (err instanceof ValidationError) {
            if (err.inner && err.inner.length > 0) {
                err.inner.forEach(error => {
                    errors.push(error);
                });
            }
            else {
                errors.push(getError(err));
            }
            errorResult = new RestError({
                code: 1,
                error: 'Validation Error',
                params: errors,
            });
        }
    }
    return errorResult;
};
//# sourceMappingURL=validator.js.map