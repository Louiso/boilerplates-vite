import { schema } from 'normalizr';

const userSchema = new schema.Entity(
  'users',
  {},
  { idAttribute: (user) => String(user.id).toLowerCase() },
);

const repositorySchema = new schema.Entity(
  'repositories',
  { owner: userSchema },
  { idAttribute: (repo) => repo.fullName.toLowerCase() },
);

export { repositorySchema, userSchema };
