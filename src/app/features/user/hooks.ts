import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { RootState } from '@/app/store'
import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { useLayoutEffect } from 'react'
import { initialQueryState } from '../utils'
import { fetchUserByUserName } from './fetchUserByUserName'

export interface FetchUserByUserNameVariables {
  variables: {
    userName: string;
  },
}

export const getUserByUserName = (args: FetchUserByUserNameVariables['variables']) => createDraftSafeSelector(
  [
    (state: RootState) => state.fetchUserByUserName,
    (state: RootState) => state.users,
  ],
  (fetchUserByUserName, users) => {
    const query = fetchUserByUserName[JSON.stringify(args)]
    const data = users[query?.data ?? '']
    return { ...initialQueryState, ...query, data }
  },
)

export const useFetchUserByUserName = (args: FetchUserByUserNameVariables) => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(getUserByUserName(args.variables))

  useLayoutEffect(() => {
    if (!data.data) {
      dispatch(fetchUserByUserName(args.variables))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, args?.variables?.userName])

  return data
}
