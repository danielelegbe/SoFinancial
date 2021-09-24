import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<User>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  post?: Maybe<Post>;
};

export type CreateCommentInput = {
  content: Scalars['String'];
  postId: Scalars['Int'];
};

export type DeleteCommentInput = {
  id: Scalars['Int'];
};

export type Forum = {
  __typename?: 'Forum';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  posts?: Maybe<Array<Post>>;
};

export type GetProfileDto = {
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createForum: Forum;
  createPost: Post;
  deleteComment: Comment;
};


export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};


export type MutationCreateForumArgs = {
  newForumInput: NewForumInput;
};


export type MutationCreatePostArgs = {
  newPostInput: NewPostInput;
};


export type MutationDeleteCommentArgs = {
  id: DeleteCommentInput;
};

export type NewForumInput = {
  name: Scalars['String'];
};

export type NewPostInput = {
  content: Scalars['String'];
  forum: Scalars['String'];
  title: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  comments?: Maybe<Array<Comment>>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  forum?: Maybe<Forum>;
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllForums: Array<Forum>;
  getAllPosts: Array<Post>;
  getProfile: User;
  me?: Maybe<User>;
};


export type QueryGetProfileArgs = {
  id: GetProfileDto;
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  comments?: Maybe<Array<Comment>>;
  email: Scalars['String'];
  id: Scalars['Int'];
  posts?: Maybe<Array<Post>>;
  username: Scalars['String'];
};

export type GetAllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostsQuery = { __typename?: 'Query', getAllPosts: Array<{ __typename?: 'Post', id: number, title: string, content: string, createdAt: any, comments?: Maybe<Array<{ __typename?: 'Comment', id: number }>>, author?: Maybe<{ __typename?: 'User', username: string }>, forum?: Maybe<{ __typename?: 'Forum', name: string }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, avatar: string }> };


export const GetAllPostsDocument = gql`
    query GetAllPosts {
  getAllPosts {
    id
    title
    content
    createdAt
    comments {
      id
    }
    author {
      username
    }
    forum {
      name
    }
  }
}
    `;

/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a React component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
      }
export function useGetAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
        }
export type GetAllPostsQueryHookResult = ReturnType<typeof useGetAllPostsQuery>;
export type GetAllPostsLazyQueryHookResult = ReturnType<typeof useGetAllPostsLazyQuery>;
export type GetAllPostsQueryResult = Apollo.QueryResult<GetAllPostsQuery, GetAllPostsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    avatar
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;