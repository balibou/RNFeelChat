import Realm from 'realm';

const UserSchema = {
  name: 'User',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    _version: 'int',
    contacts: { type: 'list', objectType: 'Contact' },
    createdAt: 'date',
    name: { type: 'NameUser' },
    phone: { type: 'PhoneUser' },
    services: { type: 'ServicesUser' },
    signedIn: 'bool',
  },
};
const ServicesUserSchema = {
  name: 'ServicesUser',
  properties: {
    phone: { type: 'PhoneServicesUser' },
    resume: { type: 'ResumeServicesUser' },
  },
};
const PhoneServicesUserSchema = {
  name: 'PhoneServicesUser',
  properties: {
    bcrypt: 'string',
  },
};
const ResumeServicesUserSchema = {
  name: 'ResumeServicesUser',
  properties: {
    loginTokens: { type: 'list', objectType: 'Token' },
  },
};
const NameUserSchema = {
  name: 'NameUser',
  properties: {
    firstName: 'string',
    lastName: 'string',
  },
};
const PhoneUserSchema = {
  name: 'PhoneUser',
  properties: {
    number: 'string',
    verified: 'bool',
  },
};
const TokenSchema = {
  name: 'Token',
  properties: {
    hashedTokens: 'string',
    when: 'date',
  },
};
const ContactSchema = {
  name: 'Contact',
  properties: {
    identifier: 'string',
    familyName: 'string',
    fullName: 'string',
    givenName: 'string',
    imageDataAvailable: 'bool',
    isFeelChatUser: 'bool',
    phoneNumbers: { type: 'list', objectType: 'phoneNumber' },
  },
};
const phoneNumberSchema = {
  name: 'phoneNumber',
  properties: {
    countryCode: 'string',
    digits: 'string',
    identifier: 'string',
    isFeelChatUser: 'bool',
    label: 'string',
    stringValue: 'string',
  },
};

export const realm = new Realm({
  schema: [
    UserSchema,
    ServicesUserSchema,
    PhoneServicesUserSchema,
    ResumeServicesUserSchema,
    NameUserSchema,
    PhoneUserSchema,
    TokenSchema,
    ContactSchema,
    phoneNumberSchema,
  ],
});
