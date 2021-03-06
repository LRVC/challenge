import * as React from 'react';

interface Props {
  topPostScore: number;
}

const PostAnalytics = ({ topPostScore }: Props) => (
  <div className="posts-header">
    <h1>Top Post Score: {topPostScore}</h1>
  </div>
);

export default PostAnalytics;
