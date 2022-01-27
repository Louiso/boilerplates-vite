import { Schemas } from '../entities'
import { CALL_API } from '../middleware'

export const STARRED_REQUEST = 'STARRED_REQUEST'
export const STARRED_SUCCESS = 'STARRED_SUCCESS'
export const STARRED_FAILURE = 'STARRED_FAILURE'

// Fetches a page of starred repos by a particular user.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchStarred = (login: string, nextPageUrl?: string) => {
  const params = {
    type: STARRED_REQUEST,
    login,
  }

  const starredPaginationKey = JSON.stringify(params)

  return {
    login,
    key: starredPaginationKey,
    [CALL_API]: {
      types: [STARRED_REQUEST, STARRED_SUCCESS, STARRED_FAILURE],
      endpoint: nextPageUrl,
      schema: Schemas.REPO_ARRAY,
    },
  }
}

export const loadStarred = (login: string, nextPage: boolean) => (dispatch: any, getState: any) => {
  const params = {
    type: STARRED_REQUEST,
    login,
  }

  const starredPaginationKey = JSON.stringify(params)

  const { nextPageUrl = `users/${login}/starred`, pageCount = 0 } = getState().pagination.starredByUser[starredPaginationKey] || {}

  if (pageCount > 0 && !nextPage) {
    return null
  }

  return dispatch(fetchStarred(login, nextPageUrl))
}
