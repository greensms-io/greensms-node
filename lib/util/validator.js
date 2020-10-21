export const validate = (yupSchema, objData) => {
  try {
    yupSchema.validateSync(objData, { strict: true, stripUnknown: true, abortEarly: false });
    return null;
  } catch (err) {
    let errors = [];
    if (err.inner && err.inner.length > 0) {
      err.inner.forEach(error => {
        errors.push(error);
      });
    } else {
      errors.push(getError(err));
    }

    return {
      code: 1,
      error: 'Validation Error',
      params: errors,
    };

  }
};

function getError(err) {
  return {
    ...err.params,
    message: err.message,
  };
}
