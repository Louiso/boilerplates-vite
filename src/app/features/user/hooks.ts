import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { useLayoutEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { FAs } from 'utils';

import { User } from '../types';
import { initialQueryState } from '../utils';
import { fetchUserByUserName } from './fetchUserByUserName';

export interface FetchUserByUserNameVariables {
  variables: {
    userName: string;
  };
}

export const getUserByUserName = (args: FetchUserByUserNameVariables['variables']) =>
  createDraftSafeSelector(
    [
      (state: RootState) => state.fetchUserByUserNameSlice,
      (state: RootState) => state.users,
    ],
    (fetchUserByUserNameSlice, users) => {
      const query = fetchUserByUserNameSlice[JSON.stringify(args)];
      const data = users[query?.data ?? ''];
      return { ...initialQueryState, ...query, data };
    },
  );

export const useFetchUserByUserName = (args: FetchUserByUserNameVariables) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(getUserByUserName(args.variables));

  useLayoutEffect(() => {
    if (!data.data) {
      dispatch(fetchUserByUserName(args.variables));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, args?.variables?.userName]);

  return data;
};

export const useClientFetchUserByUserName = (): FAs<
  User,
  FetchUserByUserNameVariables
> => {
  const dispatch = useAppDispatch();

  const [state, setState] = useState({
    loading: false,
    data: null,
  });

  const setDebounce = useDebouncedCallback((input) => {
    setState((prev) => ({ ...prev, ...input }));
  }, 100);

  const mutation = async (args: FetchUserByUserNameVariables) => {
    let data;
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const response = await dispatch(fetchUserByUserName(args.variables));
      data = response.payload.data;
    } finally {
      setDebounce({ loading: true, data });
    }
    return data;
  };

  return [mutation, state];
};
