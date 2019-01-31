import * as constants from '../constants';

export interface UpdatePostData {
  type: constants.UPDATE_POST_DATA;
  posts: [];
}

export type PostDataAction = UpdatePostData;

export function updatePostData(posts: []): UpdatePostData {
  return {
    type: constants.UPDATE_POST_DATA,
    posts
  }
}