import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from './actions/index';
import PostsTable from './components/PostsTable'
import { StoreState } from './types/index';

export function mapStateToProps({posts }: StoreState) {
  return { posts }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.PostDataAction>) {
  return {
    updatePosts: (posts: []) => dispatch(actions.updatePostData(posts))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsTable)
