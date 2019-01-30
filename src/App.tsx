import * as React from 'react';
import './App.css';

class App extends React.Component {
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
                              ... on HackerNewsV2Comment {
                                  score
                                  text
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
          this.setState({ loading: false, data: responseAsJson.data });
        });
    });
  }

  public render() {
    return (
      <div>
        <h1>Hacker news username analytics</h1>
      </div>
    );
  }
}

export default App;
