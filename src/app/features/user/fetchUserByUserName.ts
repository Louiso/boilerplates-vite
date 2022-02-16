import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { camelizeKeys } from 'humps';
import { normalize } from 'normalizr';

import { userSchema } from '../entities';
import instances from '../instance';
import { User } from '../types';
import { Query, thunkBuild } from '../utils';

const initialState: Record<string, Query<string>> = {};

const fetchUserByUserName = createAsyncThunk<any | undefined, { userName: string }>(
  'fetchUserByUserName',
  async ({ userName }, thunkAPI) => {
    try {
      const state = (thunkAPI.getState() as RootState).fetchUserByUserNameSlice[
        JSON.stringify({ userName })
      ];

      if (!state.loading || thunkAPI.requestId !== state.currentRequestId) {
        return undefined;
      }

      const response = (await instances.server.get<User>(`/users/${userName}`)).data;

      return {
        data: response,
        normalize: normalize(camelizeKeys(response), userSchema),
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const fetchUserByUserNameSlice = createSlice({
  name: 'fetchUserByUserNameSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    thunkBuild(builder, fetchUserByUserName);
  },
});

export { fetchUserByUserName };

export default fetchUserByUserNameSlice;
