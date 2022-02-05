import * as bcrypt from 'bcrypt';

export const hashing = (password: string) => bcrypt.hashSync(password, 10);

export const isMatchHash = (password: string, hash: string) => bcrypt.compareSync(password, hash);
