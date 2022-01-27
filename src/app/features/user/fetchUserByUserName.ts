import { useEffect } from 'react'
import { createAsyncThunk, createDraftSafeSelector, createSlice } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { RootState } from '@/app/store'

import { _User } from '../types'
import instances from '../instance'
import { initialQueryState, Query, thunkBuild } from '../utils'

const fetchUserByUserName = createAsyncThunk<_User, { userName: string; }>(
  'fetchUserByUserName',
  async ({ userName }, thunkAPI) => {
    try {
      const response = await instances.server.get<_User>(`/users/${userName}`)
      return response.data!
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const initialState: Record<string, Query<string>> = {}

const fetchUserByUserNameSlice = createSlice({
  name: 'fetchUserByUserName',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    thunkBuild(builder, fetchUserByUserName)
  },
})

const getUserByUserName = (userName: string) => createDraftSafeSelector(
  [
    (state: RootState) => state.fetchUserByUserName,
    (state: RootState) => state.users,
  ],
  (fetchUserByUserName, users) => {
    const query = fetchUserByUserName[JSON.stringify({ userName })]
    const data = users[query?.data ?? '']
    return { ...initialQueryState, ...query, data }
  },
)

interface FetchUserByUserNameVariables {
  variables: {
    userName: string;
  }
}

export const useFetchUserByUserName = ({ variables: { userName } }: FetchUserByUserNameVariables) => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(getUserByUserName(userName))

  useEffect(() => {
    dispatch(fetchUserByUserName({ userName }))
  }, [dispatch, userName])

  return data
}

export { fetchUserByUserName }

export default fetchUserByUserNameSlice
