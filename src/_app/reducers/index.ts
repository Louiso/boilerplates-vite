import merge from 'lodash/merge'
import { combineReducers } from 'redux'
import * as ActionTypes from '../actions'
import paginate from './paginate'

// Updates an entity cache in response to any action with response.entities.
// eslint-disable-next-line default-param-last
const entities = (state: unknown = { users: {}, repos: {} }, action: any) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

// Updates error message to notify about the failed fetches.
// eslint-disable-next-line default-param-last
const errorMessage = (state = null, action: { type: any; error: any }) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } if (error) {
    return error
  }

  return state
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: (action: any) => {
      const params = {
        type: 'STARRED_REQUEST',
        login: action.login,
      }

      const starredPaginationKey = JSON.stringify(params)

      return starredPaginationKey
    },
    types: [
      ActionTypes.STARRED_REQUEST,
      ActionTypes.STARRED_SUCCESS,
      ActionTypes.STARRED_FAILURE,
    ],
  }),
  stargazersByRepo: paginate({
    mapActionToKey: (action: any) => action.fullName,
    types: [
      ActionTypes.STARGAZERS_REQUEST,
      ActionTypes.STARGAZERS_SUCCESS,
      ActionTypes.STARGAZERS_FAILURE,
    ],
  }),
})

const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage,
})

export default rootReducer
