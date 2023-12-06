import * as Yup from 'yup';

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please provide valid email')
    .required('Email is required'),
  password: Yup.string().required('Please provide a valid password'),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
  //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number',
  // ),
});
export const SignUpValidationSchema = Yup.object().shape({
  fname: Yup.string().required('Please enter your first name'),
  lname: Yup.string().required('Please enter your last name'),
  email: Yup.string()
    .email('Please provide valid email')
    .required('Please enter your email address'),
  password: Yup.string()
    .required('No password provided.')
    // .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),

  confirmPassword: Yup.string()
    .required()
    .label('Confirm Password')
    .oneOf([Yup.ref('password')], 'Passwords does not match'),
});
export const updateProfileSchema = Yup.object().shape({
  fname: Yup.string().required('Please enter your first name'),
  lname: Yup.string().required('Please enter your last name'),
  email: Yup.string()
    .email('Please provide valid email')
    .required('Please enter your email address'),
  // phoneNumber: Yup.string().required('Please enter your Phone Number'),

  // phoneNumber: Yup.string()
  // .matches(
  //   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  //   'Phone number is not valid',
  // ),
});
export const addReportValidationSchema = Yup.object().shape({
  rpTitle: Yup.string().required('Report Title is required!!'),
  rprtDesrptn: Yup.string().required('Wave Description is required!!'),
});
export const addShopValidationSchema = Yup.object().shape({
  prdtitle: Yup.string().required('Product Title is required!!'),
  Loctn: Yup.string().required('Location is required field!!'),
  price: Yup.string().required('Price is required field!!'),

  desrptn: Yup.string().required('Please provide description about Product!!'),
});
export const forgotPasValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please provide valid email')
    .required('Please enter your email address'),
});
export const resetPasValidationSchema = Yup.object().shape({
  password: Yup.string().required('Reset Password is required!'),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
  //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number',
  // ),
});

export const changePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  newPassword: Yup.string()
    .required('No new password provided.')
    .min(8, 'New Password is too short - should be 8 chars minimum.'),
  confirmPassword: Yup.string()
    .required()
    .label('Confirm Password')
    .oneOf([Yup.ref('newPassword')], 'Passwords does not match'),
});
