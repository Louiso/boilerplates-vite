import { createSlice } from '@reduxjs/toolkit'
import { fetchUserByUserName } from '../user/fetchUserByUserName'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: Record<string, any> = {}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByUserName.fulfilled, (state, action) => {
        const key = String(action.payload.id)
        state[key] = {
          ...state[key],
          ...action.payload,
        }
      })
  },
})

export default usersSlice
