import Meteor, { call } from 'react-native-meteor';
import _ from 'underscore';
import { typeCheck } from 'type-check';
import { hashPassword } from '../utils';

export const createUserWithPhone = (options, callback) => {
  options = _.clone(options); // we'll be modifying options

  // If no password was given create random one
  if (typeof options.password !== 'string' || !options.password) {
    options.password = Math.random().toString(36).slice(-8);
  }

  // Replace password with the hashed password.
  options.password = hashPassword(options.password);

  Meteor._startLoggingIn();
  call('createUserWithPhone', options, (err, res) => {
    Meteor._endLoggingIn();
    Meteor._handleLoginCallback(err, res);
    callback(err, res);
  });
};

export const loginWithPhoneAndPassword = (selector, password, callback) => {
  if (typeof selector === 'string') {
    selector = { phone: selector };
  }

  Meteor._startLoggingIn();
  call('login', {
    user: selector,
    password: hashPassword(password)
  }, (err, res) => {
    Meteor._endLoggingIn();
    Meteor._handleLoginCallback(err, res);
    typeof callback == 'function' && callback(err);
  });
};

export const isPhoneVerified = () => {
  const me = Meteor.user();
  return !!(me && me.phone && me.phone.verified);
};

export const requestPhoneVerification = (phone, callback) => {
  if (!phone) {
    throw new Error('Must pass phone');
  }
  call('requestPhoneVerification', phone, callback);
};

export const verifyPhone = (phone, code, newPassword, callback) => {
  typeCheck('String', code);
  typeCheck('String', phone);

  let hashedPassword;

  if (newPassword) {
    // If didn't gave newPassword and only callback was given
    if (typeof newPassword === 'function') {
      callback = newPassword;
    } else {
      typeCheck('String', newPassword);
      hashedPassword = hashPassword(newPassword);
    }
  }
  call('verifyPhone', phone, code, hashedPassword, callback);
};

// import {
//   loginWithPhoneAndPassword,
//   createUserWithPhone,
//   isPhoneVerified,
//   requestPhoneVerification,
//   verifyPhone,
// } from '../accounts-phone/phone_client';

// createUserWithPhone({ phone: 'phone', password: 'password' }, (e, r) => {
//   if (e) console.log(e);
//   if (r) console.log(r);
// });

// loginWithPhoneAndPassword({phone:'phone'}, 'password', (e, r) => {
//   if (e) console.log(e);
//   if (r) console.log(r);
// });
// console.log(isPhoneVerified());

// requestPhoneVerification('phone', (e, r) => {
//   if (e) console.log(e);
//   if (r) console.log(r);
// });

// verifyPhone('phone', 'code', (e, r) => {
//   if (e) console.log(e);
//   if (r) console.log(r);
// });
