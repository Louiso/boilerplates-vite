import union from 'lodash/union'

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.

interface Paginate {
  isFetching: boolean;
  nextPageUrl?: undefined;
  pageCount: 0;
  ids: string[];
}

const paginate = ({
  types, mapActionToKey,
// eslint-disable-next-line no-unused-vars
}: { types: string[], mapActionToKey: (params: unknown) => string;}) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every((t) => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.')
  }

  const [requestType, successType, failureType] = types

  // eslint-disable-next-line default-param-last
  const updatePagination = (state: Paginate = {
    isFetching: false,
    nextPageUrl: undefined,
    pageCount: 0,
    ids: [],
  }, action: any) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true,
        }
      case successType:
        return {
          ...state,
          isFetching: false,
          ids: union(state.ids, action.response.result),
          nextPageUrl: action.response.nextPageUrl,
          pageCount: state.pageCount + 1,
        }
      case failureType:
        return {
          ...state,
          isFetching: false,
        }
      default:
        return state
    }
  }

  // eslint-disable-next-line default-param-last
  return (state: any = {}, action: any) => {
    // Update pagination by key
    switch (action.type) {
      case requestType:
      case successType:
      case failureType: {
        const key = mapActionToKey(action)
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.')
        }
        return {
          ...state,
          [key]: updatePagination(state[key], action),
        }
      }
      default: {
        return state
      }
    }
  }
}

export default paginate
