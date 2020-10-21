import * as Yup from 'yup';

const SmsSchema = {
  send: Yup.object().shape({
    to: Yup.string().required().min(11).max(14).matches(/^\d+$/),
    txt: Yup.string().required().min(1),
    from: Yup.string().min(1),
    tag: Yup.string().min(1),
    hidden: Yup.string().min(1),
  }),
  status: Yup.object().shape({
    id: Yup.string().required().length(36),
    extended: Yup.boolean(),
  }),
};

export default SmsSchema;
