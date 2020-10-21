import * as Yup from 'yup';

const PaySchema = {
  send: Yup.object().shape({
    to: Yup.string().required().min(11).max(14).matches(/^\d+$/),
    amount: Yup.number().required().min(1).positive(),
  }),
  status: Yup.object().shape({
    id: Yup.string().required().length(36),
    extended: Yup.boolean(),
  }),
};

export default PaySchema;