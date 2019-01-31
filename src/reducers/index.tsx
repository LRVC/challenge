import { PostDataAction } from "../actions/index";
import UPDATE_POST_DATA from '../constants/index';
import { StoreState } from '../types/index';

export function postData(state: StoreState, action: PostDataAction): StoreState {
  switch(action.type) {
    case UPDATE_POST_DATA:
      return {
        ...state,
        posts: action.posts
      }
  }
  return state;
}