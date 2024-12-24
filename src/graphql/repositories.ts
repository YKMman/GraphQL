import { gql } from "@apollo/client";

export interface RepositoryOwner {
  login: string;
  avatarUrl: string;
}

export interface Repository {
  id: string;
  name: string;
  owner: RepositoryOwner;
}

export interface PageInfo {
  endCursor: string | null;
  startCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SearchResult {
  repositoryCount: number;
  edges: {
      cursor: string;
      node: Repository;
  }[];
  pageInfo: PageInfo;
}

export interface GetRepositoriesResponse {
  search: SearchResult;
}

export interface GetRepositoriesVariables {
  query: string;
  first?: number;
  after?: string;
  before?: string;
}

export const GET_REPOSITORIES = gql`
    query (
      $query: String!, 
      $first: Int, 
      $after: String,
      $before: String,
    ) {
      search(
        type: REPOSITORY, 
        query: $query, 
        first: $first,
        after: $after,
        before: $before,
      ) {
        repositoryCount
        edges {
          cursor
          node {
            ... on Repository {
                id
                name
                owner {
                  login
                  avatarUrl
                }
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
    }
  }
`
