import * as React from 'react';
import HackerNewsApi from "../api/HackerNewsApi";
import PostAnalytics from "./PostAnalytics";

interface Props {
  posts: [];
  topPostScore: number;
  username: string;
  updatePosts: (posts: []) => void;
  updateUserName: (username: string) => void;
}

interface State {
  loading: boolean;
}

class PostsTable extends React.Component<Props, State> {
  public readonly state: State = {
    loading: false,
  };

  constructor(props: Props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.props.updateUserName(event.currentTarget.value);
  }

  public handleSubmit(event: any) {
    event.preventDefault();

    this.setState({loading: true}, () => {
      HackerNewsApi.fetchPosts(this.props.username)
        .then(response => {
          return response.json();
        })
        .then(responseAsJson => {
          const edgeData: [] = responseAsJson.data.hn2.nodeFromHnId.submitted !== undefined ?
            responseAsJson.data.hn2.nodeFromHnId.submitted.edges : [];

          this.props.updatePosts(edgeData);
          this.setState({
            ...this.state,
            loading: false
          });
        });
    });
  }

  public render() {
    return (
      <div>
        <h1 className="align-center">Hacker News Analytics</h1>
        <h4 className="align-center">Enter your Hacker News User ID and get data on your posts</h4>

        <form onSubmit={this.handleSubmit} className="form-margin-top">
          <input type="text" value={this.props.username} onChange={this.handleChange} placeholder="HN User ID"/>
          <input type="submit" value="Submit" className="button"/>
        </form>

        {this.state.loading === true ? (
          <div className="loading-header">
            <h1>Loading</h1>
            <hr className="top-score-hr"/>
          </div>
        ) : (
          <div>
            <PostAnalytics topPostScore={this.props.topPostScore}/>
            <hr className="top-score-hr"/>

            {this.props.posts.map((post, index) =>
              <div key={index} className="flex-container">
                <div>
                  <h4>Score: {post['node']['score'] !== undefined ? post['node']['score'] : 0}</h4>
                </div>
                <div>
                  <h4>{post['node']['url'] !== undefined ? <a href={post['node']['url']}>Post Link</a> : "Missing"}</h4>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default PostsTable;
