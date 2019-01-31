import * as constants from '../constants';

export interface UpdatePostData {
  type: constants.UPDATE_POST_DATA;
  posts: [];
}

export interface UpdateUserName {
  type: constants.UPDATE_USER_NAME;
  username: string;
}

export type PostDataAction = UpdatePostData | UpdateUserName;

export function updatePostData(posts: []): UpdatePostData {
  return {
    type: constants.UPDATE_POST_DATA,
    posts
  }
}

export function updateUserName(username: string): UpdateUserName {
  return {
    type: constants.UPDATE_USER_NAME,
    username
  }
}