import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { camelizeKeys } from 'humps'

import { normalize } from 'normalizr'
import { _User } from '../types'
import instances from '../instance'
import { Query, thunkBuild } from '../utils'
import { userSchema } from '../entities'

const initialState: Record<string, Query<string>> = {}

const fetchUserByUserName = createAsyncThunk<any | undefined, { userName: string; }>(
  'fetchUserByUserName',
  async ({ userName }, thunkAPI) => {
    try {
      const state = (thunkAPI.getState() as RootState).fetchUserByUserName[JSON.stringify({ userName })]

      if (!state.loading || thunkAPI.requestId !== state.currentRequestId) {
        return undefined
      }

      const response = (await instances.server.get<_User>(`/users/${userName}`)).data

      return normalize(camelizeKeys(response), userSchema)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const fetchUserByUserNameSlice = createSlice({
  name: 'fetchUserByUserName',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    thunkBuild(builder, fetchUserByUserName)
  },
})

export { fetchUserByUserName }

export default fetchUserByUserNameSlice
