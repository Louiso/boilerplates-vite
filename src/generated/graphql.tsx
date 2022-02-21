import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Curriculum = {
  __typename?: 'Curriculum';
  fileName?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type EmailsPhonesResponse = {
  __typename?: 'EmailsPhonesResponse';
  _id?: Maybe<Scalars['ID']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type KrowdyGeoCountryCode = {
  __typename?: 'KrowdyGeoCountryCode';
  countryCode: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  range: Array<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  logout?: Maybe<Response>;
};

export type Query = {
  __typename?: 'Query';
  authorization: Response;
  getCountryCode?: Maybe<KrowdyGeoCountryCode>;
  getUser?: Maybe<User>;
  holaMundo?: Maybe<Scalars['String']>;
};


export type QueryGetCountryCodeArgs = {
  ip: Scalars['String'];
};


export type QueryHolaMundoArgs = {
  name: Scalars['String'];
};

export type Response = {
  __typename?: 'Response';
  data?: Maybe<Scalars['JSON']>;
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
};

export type AuthorizationQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthorizationQuery = { __typename?: 'Query', authorization: { __typename?: 'Response', success: boolean, data?: any | null } };


export const AuthorizationDocument = gql`
    query authorization {
  authorization {
    success
    data
  }
}
    `;

/**
 * __useAuthorizationQuery__
 *
 * To run a query within a React component, call `useAuthorizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthorizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthorizationQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthorizationQuery(baseOptions?: Apollo.QueryHookOptions<AuthorizationQuery, AuthorizationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthorizationQuery, AuthorizationQueryVariables>(AuthorizationDocument, options);
      }
export function useAuthorizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthorizationQuery, AuthorizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthorizationQuery, AuthorizationQueryVariables>(AuthorizationDocument, options);
        }
export type AuthorizationQueryHookResult = ReturnType<typeof useAuthorizationQuery>;
export type AuthorizationLazyQueryHookResult = ReturnType<typeof useAuthorizationLazyQuery>;
export type AuthorizationQueryResult = Apollo.QueryResult<AuthorizationQuery, AuthorizationQueryVariables>;