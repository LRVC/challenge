import * as React from 'react';
import './App.css';

interface State {
  loading: boolean;
  posts: [];
}

class App extends React.Component<{}, State> {
  public readonly state: State = {
    loading: false,
    posts: []
  };

  public componentDidMount(): void {
    this.setState({ loading: true }, () => {
      fetch("https://www.graphqlhub.com/graphql", {
        body: JSON.stringify({
          query: `{
                    hn2 {
                      nodeFromHnId(id:"clayallsopp", isUserId:true) {
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
          this.setState({ loading: false, posts: responseAsJson.data.hn2.nodeFromHnId.submitted.edges });
        });
    });
  }

  public render() {
    return (
      <div>
        <h1>Hacker news username analytics</h1>

        {this.state.loading === true ? (
          <h1>Loading</h1>
        ) : (
          <ul>
            {this.state.posts.map((post, index) =>
              <li key={index}>
                Score: {post['node']['score'] !== undefined ? post['node']['score'] : 0}
              </li>
            )}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
