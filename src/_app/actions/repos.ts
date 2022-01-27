import { Schemas } from '../entities'
import { CALL_API } from '../middleware'

export const REPO_REQUEST = 'REPO_REQUEST'
export const REPO_SUCCESS = 'REPO_SUCCESS'
export const REPO_FAILURE = 'REPO_FAILURE'

// Fetches a single repository from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchRepo = (fullName: string) => ({
  [CALL_API]: {
    types: [REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE],
    endpoint: `repos/${fullName}`,
    schema: Schemas.REPO,
  },
})

// Fetches a single repository from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadRepo = (fullName: string, requiredFields = []) => (
  dispatch: any,
  getState: any,
) => {
  const repo = getState().entities.repos[fullName]
  if (repo && requiredFields.every((key) => repo.hasOwnProperty(key))) {
    return null
  }

  return dispatch(fetchRepo(fullName))
}
