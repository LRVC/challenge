import { PostDataAction } from "../actions/index";
import UPDATE_POST_DATA from '../constants/index';
import { StoreState } from '../types/index';

function topScore(posts: []): number {
  const postScores: number[] = posts
      .filter((post) => post['node']['score'] !== undefined)
      .map((post) => post['node']['score']);

  return Math.max(...postScores);
}

export function postData(state: StoreState, action: PostDataAction): StoreState {
  switch(action.type) {
    case UPDATE_POST_DATA:
      return {
        ...state,
        posts: action.posts,
        topPostScore: topScore(action.posts)
      }
  }
  return state;
}