export enum AccountOrigin {
  'local' = 'LOCAL',
  'google' = 'GOOGLE'
}

export enum AccountRole {
  'admin' = 'admin',
  'slave' = 'slave'
}

export type UserType = {
  avatar: string
  name: string
  surname: string
  userId: string
  email: string
  password: string
  updateAt: Date
  role: AccountRole
  origin: AccountOrigin
}