import React from 'react';

import './Post.css';
import dummyImg from '../../../images/dummy.jpg';

function Post({ post }) {
  const avatarLink = post.owner.profile_image;

  // декодирование html тэгов
  const decodeitText = (text) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
  };

  // обработка клика по ячейке
  const clickHandler = (evt, link) => {
    evt.preventDefault();
    window.open(link);
  };

  return (
    <div onClick={evt => clickHandler(evt, post.link)}
      className="post__container">
      <div className="post__avatar-container">
        <img alt='stackoverflow' className="post__avatar-img"
          src={avatarLink}
          // установка заглушки в случае отсутствия аватара
          onError={(e) => {
            e.target.onerror = null; e.target.src = dummyImg;
          }} />
      </div>
      <div className="post__content-container">
        <a href={post.link} target="_blank" rel="noopener noreferrer"
          className="post__main-link">
          {decodeitText(post.title)}
        </a>
      </div>
    </div>
  );
}

export default Post;
