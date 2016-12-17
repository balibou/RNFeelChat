import SHA256 from 'crypto-js/sha256';

export const hashPassword = (password) =>
  ({
    digest: SHA256(password).toString(),
    algorithm: 'sha-256',
  });
