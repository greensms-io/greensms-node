import * as Yup from 'yup';

const HlrSchema = {
  send: Yup.object().shape({
    to: Yup.string().required().min(11).max(14).matches(/^\d+$/),
  }),
  status: Yup.object().shape({
    id: Yup.string().required().length(36),
    extended: Yup.boolean(),
  }),
};

export default HlrSchema;
