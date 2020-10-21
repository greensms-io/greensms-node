import * as Yup from 'yup';

const GeneralSchema = {
  lookup: Yup.object().shape({
    to: Yup.string().required().min(11).max(14).matches(/^\d+$/),
  }),
};

export default GeneralSchema;
