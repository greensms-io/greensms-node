import * as Yup from 'yup';

const AccountSchema = {
  token: Yup.object().shape({
    expire: Yup.number().positive().integer(),
  }),
};

export default AccountSchema;
