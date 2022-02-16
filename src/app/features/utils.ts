import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit';

export interface Query<T> {
  data: T | null;
  loading: boolean;
  currentRequestId?: string;
  error: Error | unknown;
}

export const initialQueryState = {
  data: null,
  loading: true,
  currentRequestId: undefined,
  error: null,
};

export function thunkBuild(
  builder: ActionReducerMapBuilder<Record<string, Query<string | null>>>,
  // - eslint-disable-next-line @typescript-eslint/no-explicit-any
  thunk: AsyncThunk<any, any, any>,
  // eslint-disable-next-line
  key?: (action: any) => string,
) {
  return builder
    .addCase(thunk.pending, (state, action) => {
      const _key = key ? key(action) : JSON.stringify(action.meta.arg);

      if (state[_key] && !state[_key].loading) {
        state[_key].loading = true;
        state[_key].currentRequestId = action.meta.requestId;
      } else if (!state[_key]) {
        state[_key] = {
          ...initialQueryState,
          currentRequestId: action.meta.requestId,
        };
      }
    })
    .addCase(thunk.fulfilled, (state, action) => {
      const _key = key ? key(action) : JSON.stringify(action.meta.arg);
      const { requestId } = action.meta;
      const node = state[_key];

      if (node.loading && node.currentRequestId === requestId) {
        node.loading = false;
        node.data = String(action.payload.normalize.result);
        node.currentRequestId = undefined;
      }
    })
    .addCase(thunk.rejected, (state, action) => {
      const _key = key ? key(action) : JSON.stringify(action.meta.arg);
      const { requestId } = action.meta;
      const node = state[_key];
      if (node.loading && node.currentRequestId === requestId) {
        node.loading = false;
        node.error = action.error;
        node.currentRequestId = undefined;
      }
    });
}
