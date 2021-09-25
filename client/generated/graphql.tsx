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
  createForum: Scalars['Boolean'];
  createPost: Post;
  deleteComment: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
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
  data: DeleteCommentInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
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
  getForum?: Maybe<Forum>;
  getPostById?: Maybe<Post>;
  getProfile: User;
  me?: Maybe<User>;
};


export type QueryGetForumArgs = {
  name: Scalars['String'];
};


export type QueryGetPostByIdArgs = {
  data: QueryPostInput;
};


export type QueryGetProfileArgs = {
  id: GetProfileDto;
};

export type QueryPostInput = {
  id?: Maybe<Scalars['Int']>;
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

export type CreateCommentMutationVariables = Exact<{
  createCommentCreateCommentInput: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: number, content: string, author?: Maybe<{ __typename?: 'User', username: string, avatar: string }> } };

export type CreateForumMutationVariables = Exact<{
  createForumNewForumInput: NewForumInput;
}>;


export type CreateForumMutation = { __typename?: 'Mutation', createForum: boolean };

export type CreatePostMutationVariables = Exact<{
  createPostNewPostInput: NewPostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, content: string, title: string } };

export type DeleteCommentMutationVariables = Exact<{
  deleteCommentData: DeleteCommentInput;
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type DeletePostMutationVariables = Exact<{
  deletePostId: Scalars['Int'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type GetAllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostsQuery = { __typename?: 'Query', getAllPosts: Array<{ __typename?: 'Post', id: number, title: string, content: string, createdAt: any, comments?: Maybe<Array<{ __typename?: 'Comment', id: number }>>, author?: Maybe<{ __typename?: 'User', username: string, avatar: string }>, forum?: Maybe<{ __typename?: 'Forum', name: string }> }> };

export type GetForumQueryVariables = Exact<{
  getForumName: Scalars['String'];
}>;


export type GetForumQuery = { __typename?: 'Query', getForum?: Maybe<{ __typename?: 'Forum', id: number, createdAt: any, name: string, posts?: Maybe<Array<{ __typename?: 'Post', id: number, title: string, content: string, createdAt: any, forum?: Maybe<{ __typename?: 'Forum', name: string }>, author?: Maybe<{ __typename?: 'User', id: number, email: string, username: string, avatar: string }>, comments?: Maybe<Array<{ __typename?: 'Comment', id: number }>> }>> }> };

export type GetPostByIdQueryVariables = Exact<{
  getPostByIdData: QueryPostInput;
}>;


export type GetPostByIdQuery = { __typename?: 'Query', getPostById?: Maybe<{ __typename?: 'Post', id: number, title: string, content: string, createdAt: any, author?: Maybe<{ __typename?: 'User', id: number, username: string, avatar: string }>, comments?: Maybe<Array<{ __typename?: 'Comment', id: number, content: string, createdAt: any, author?: Maybe<{ __typename?: 'User', id: number, username: string, avatar: string }> }>> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, avatar: string }> };


export const CreateCommentDocument = gql`
    mutation CreateComment($createCommentCreateCommentInput: CreateCommentInput!) {
  createComment(createCommentInput: $createCommentCreateCommentInput) {
    id
    content
    author {
      username
      avatar
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      createCommentCreateCommentInput: // value for 'createCommentCreateCommentInput'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateForumDocument = gql`
    mutation CreateForum($createForumNewForumInput: NewForumInput!) {
  createForum(newForumInput: $createForumNewForumInput)
}
    `;
export type CreateForumMutationFn = Apollo.MutationFunction<CreateForumMutation, CreateForumMutationVariables>;

/**
 * __useCreateForumMutation__
 *
 * To run a mutation, you first call `useCreateForumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateForumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createForumMutation, { data, loading, error }] = useCreateForumMutation({
 *   variables: {
 *      createForumNewForumInput: // value for 'createForumNewForumInput'
 *   },
 * });
 */
export function useCreateForumMutation(baseOptions?: Apollo.MutationHookOptions<CreateForumMutation, CreateForumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateForumMutation, CreateForumMutationVariables>(CreateForumDocument, options);
      }
export type CreateForumMutationHookResult = ReturnType<typeof useCreateForumMutation>;
export type CreateForumMutationResult = Apollo.MutationResult<CreateForumMutation>;
export type CreateForumMutationOptions = Apollo.BaseMutationOptions<CreateForumMutation, CreateForumMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($createPostNewPostInput: NewPostInput!) {
  createPost(newPostInput: $createPostNewPostInput) {
    id
    content
    title
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      createPostNewPostInput: // value for 'createPostNewPostInput'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($deleteCommentData: DeleteCommentInput!) {
  deleteComment(data: $deleteCommentData)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      deleteCommentData: // value for 'deleteCommentData'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($deletePostId: Int!) {
  deletePost(id: $deletePostId)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      deletePostId: // value for 'deletePostId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
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
      avatar
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
export const GetForumDocument = gql`
    query GetForum($getForumName: String!) {
  getForum(name: $getForumName) {
    id
    createdAt
    name
    posts {
      id
      title
      content
      createdAt
      forum {
        name
      }
      author {
        id
        email
        username
        avatar
      }
      comments {
        id
      }
    }
  }
}
    `;

/**
 * __useGetForumQuery__
 *
 * To run a query within a React component, call `useGetForumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumQuery({
 *   variables: {
 *      getForumName: // value for 'getForumName'
 *   },
 * });
 */
export function useGetForumQuery(baseOptions: Apollo.QueryHookOptions<GetForumQuery, GetForumQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetForumQuery, GetForumQueryVariables>(GetForumDocument, options);
      }
export function useGetForumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetForumQuery, GetForumQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetForumQuery, GetForumQueryVariables>(GetForumDocument, options);
        }
export type GetForumQueryHookResult = ReturnType<typeof useGetForumQuery>;
export type GetForumLazyQueryHookResult = ReturnType<typeof useGetForumLazyQuery>;
export type GetForumQueryResult = Apollo.QueryResult<GetForumQuery, GetForumQueryVariables>;
export const GetPostByIdDocument = gql`
    query GetPostById($getPostByIdData: QueryPostInput!) {
  getPostById(data: $getPostByIdData) {
    id
    title
    content
    createdAt
    author {
      id
      username
      avatar
    }
    comments {
      id
      content
      createdAt
      author {
        id
        username
        avatar
      }
    }
  }
}
    `;

/**
 * __useGetPostByIdQuery__
 *
 * To run a query within a React component, call `useGetPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByIdQuery({
 *   variables: {
 *      getPostByIdData: // value for 'getPostByIdData'
 *   },
 * });
 */
export function useGetPostByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
      }
export function useGetPostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
        }
export type GetPostByIdQueryHookResult = ReturnType<typeof useGetPostByIdQuery>;
export type GetPostByIdLazyQueryHookResult = ReturnType<typeof useGetPostByIdLazyQuery>;
export type GetPostByIdQueryResult = Apollo.QueryResult<GetPostByIdQuery, GetPostByIdQueryVariables>;
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