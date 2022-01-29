import { createSlice } from '@reduxjs/toolkit'
import { merge } from 'lodash'
import { fetchUserByUserName } from '../user/fetchUserByUserName'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: Record<string, any> = {}

const name = 'users'
const usersSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByUserName.fulfilled, (state, action) => merge({}, state, action.payload.entities[name]))
  },
})

export default usersSlice
