import * as React from 'react';
import PostAnalytics from "./PostAnalytics";

interface Props {
  posts: [];
  updatePosts: (posts: [])=> void;
}

interface State {
  loading: boolean;
  username: string;
}

class PostsTable extends React.Component<Props, State> {
  public readonly state: State = {
    loading: false,
    username: ""
  };

  constructor(props: any) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      username: event.currentTarget.value
    });
  }

  public handleSubmit(event: any) {
    event.preventDefault();

    this.setState({ loading: true }, () => {
      fetch("https://www.graphqlhub.com/graphql", {
        body: JSON.stringify({
          query: `{
                    hn2 {
                      nodeFromHnId(id:"${this.state.username}", isUserId:true) {
                        id
                        ... on HackerNewsV2User {
                          submitted(first: 5) {
                            pageInfo {
                              hasNextPage
                              endCursor
                            }
                            edges {
                              cursor
                              node {
                                id
                              ... on HackerNewsV2Story {
                                  score
                                  url
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }`
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      })
        .then(response => {
          return response.json();
        })
        .then(responseAsJson => {
          const edgeData: any  = responseAsJson.data.hn2.nodeFromHnId.submitted !== undefined ? responseAsJson.data.hn2.nodeFromHnId.submitted.edges : [];

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
        <h4 className="align-center">Enter your Hacker News ID and get analytics on your posts</h4>

        <form onSubmit={this.handleSubmit} className="form-margin-top">
          <input type="text" value={this.state.username} onChange={this.handleChange} placeholder="HN User ID" />
          <input type="submit" value="Submit" className="button" />
        </form>

        {this.state.loading === true ? (
          <h1>Loading</h1>
        ) : (
          <div>
            <PostAnalytics topPostScore={6}/>

            <ul>
              {this.props.posts.map((post, index) =>
                <li key={index}>
                  Score: {post['node']['score'] !== undefined ? post['node']['score'] : 0}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default PostsTable;
