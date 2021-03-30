import React from 'react';

import './PostsList.css';

import Post from '../Post/Post';

function PostsList({ postList }) {
  return (
    <div className="postList__content">
      {postList.map((item) => {
        return (
          <Post
            post={item}
            key={item.question_id}
          />);
      })}
    </div>
  );
}

export default PostsList;
