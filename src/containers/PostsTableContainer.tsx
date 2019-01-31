import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../actions';
import PostsTable from '../components/PostsTable'
import { StoreState } from '../types';

export function mapStateToProps({posts, topPostScore, username }: StoreState) {
  return {
    posts,
    topPostScore,
    username
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.PostDataAction>) {
  return {
    updatePosts: (posts: []) => dispatch(actions.updatePostData(posts)),
    updateUserName: (username: string) => dispatch(actions.updateUserName(username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsTable)
