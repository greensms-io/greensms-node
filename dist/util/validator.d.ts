import type { AnySchema } from 'yup';
import RestError from '../http/rest-error';
/**
 * Returns an Error object validating data against a schema
 * @param {Yup} yupSchema - Yup schema with rules
 * @param {object} objData - Data object to validate
 */
export declare const validate: (yupSchema: AnySchema, objData: Record<string, unknown>) => RestError | null;
