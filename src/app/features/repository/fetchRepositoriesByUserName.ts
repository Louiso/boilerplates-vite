import { createAsyncThunk } from '@reduxjs/toolkit'
import { _Repository } from '../types'
import instances from '../instance'

const fetchRepositoriesByUserName = createAsyncThunk<_Repository, { userName: string; }>(
  'repositories/byUserName',
  async ({ userName }, thunkAPI) => {
    try {
      const response = await instances.server.get<_Repository>(`/users/${userName}/repos`)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export default fetchRepositoriesByUserName
