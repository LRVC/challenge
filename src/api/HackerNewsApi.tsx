export default class HackerNewsApi {
  public static fetchPosts(username: string): Promise<any> {
    return fetch("https://www.graphqlhub.com/graphql", {
      body: JSON.stringify({
        query: `{
                    hn2 {
                      nodeFromHnId(id:"${username}", isUserId:true) {
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
  }
}