import * as React from 'react';
import './App.css';

interface State {
  loading: boolean;
  posts: [];
  username: string;
}

class App extends React.Component<{}, State> {
  public readonly state: State = {
    loading: false,
    posts: [],
    username: ""
  };

  constructor(props: any) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleChange(event: any) {
    this.setState({
      ...this.state,
      username: event.target.value
    });

    console.log("state during change: ", this.state)
  }

  public handleSubmit(event: any) {
    event.preventDefault();

    console.log("we made it here at least", this.state)

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
          this.setState({
            ...this.state,
            loading: false,
            posts: responseAsJson.data.hn2.nodeFromHnId.submitted.edges
          });
        });
    });
  }

  public render() {
    return (
      <div>
        <h1>Hacker news username analytics</h1>

        <form onSubmit={this.handleSubmit}>
          <label>
            Hacker News User Id:
            <input type="text" value={this.state.username} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

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
