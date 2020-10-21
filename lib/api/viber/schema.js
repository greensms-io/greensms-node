import * as Yup from 'yup';

const ViberSchema = {
  send: Yup.object().shape({
    to: Yup.string().required().min(11).max(14).matches(/^\d+$/),
    txt: Yup.string().required().min(1),
    from: Yup.string().min(1),
    cascade: Yup.string().oneOf(['sms', 'voice']),
  }),
  status: Yup.object().shape({
    id: Yup.string().required().length(36),
    extended: Yup.boolean(),
  }),
};

export default ViberSchema;
