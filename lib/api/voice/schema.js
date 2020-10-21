import * as Yup from 'yup';

const VoiceSchema = {
  send: Yup.object().shape({
    to: Yup.string().required().min(11).max(14).matches(/^\d+$/),
    txt: Yup.string().required().min(1).max(5).matches(/^\d+$/),
    lang: Yup.string().oneOf(['ru', 'en']),
  }),
  status: Yup.object().shape({
    id: Yup.string().required().length(36),
    extended: Yup.boolean(),
  }),
};

export default VoiceSchema;
