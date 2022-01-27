import { schema } from 'normalizr'

const userSchema = new schema.Entity(
  'users',
  {},
  { idAttribute: (user) => user.login.toLowerCase() },
)

const repositorySchema = new schema.Entity(
  'repositories',
  { owner: userSchema },
  { idAttribute: (repo) => repo.fullName.toLowerCase() },
)

export {
  userSchema,
  repositorySchema,
}
