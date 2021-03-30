import React, { useEffect, useState, useCallback } from 'react';

// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

import './Main.css';

import PostsList from './PostsList/PostsList';
import { getPosts } from '../../utils/PostsApi';
import {
  minOwnerReputation, ddosError,
} from '../../utils/constants';

function Main() {
  const [loadind, setLoading] = useState(true);
  const [postList, setPostList] = useState({});
  const [serverError, setServerError] = useState(false);
  const [sortByDesc, setSortByDesc] = useState(true);
  const [throttleViolation, setThrottleViolation] = useState(false);

  // обработчик клика по кнопке, сортировка списка
  const swapSort = () => {
    sortByDesc ? setSortByDesc(false) : setSortByDesc(true);
    setLoading(true);
  };

  // обработчик списка постов
  const handlePostListModified = (postList) => {
    setPostList(
      _(postList)
        // .filter(p => p.is_answered === true && p.owner.reputation >= 50)
        // На мой взгляд улучшает читаемость
        .filter(p => p.is_answered === true)
        .filter(p => p.owner.reputation >= minOwnerReputation)
        .orderBy(p => p.creation_date, sortByDesc ? 'desc' : 'asc')
        .value(),
    );
  };

  // получение списка постов с сервера
  const handleGetPosts = useCallback(() => {
    getPosts(100, 1) // (itemOnPage, numberOfPages)
      .then((post) => {
        // обработка пропуска ошибки
        if (typeof post['error_id'] !== 'undefined') {
          post['error_id'] === ddosError ?
            setThrottleViolation(true) :
            setThrottleViolation(false);
          setServerError(true);
          setLoading(false);
        } else {
          handlePostListModified(post.items);
          setLoading(false);
          setServerError(false);
        }
      })
      .catch((err) => {
        setServerError(true);
        setLoading(false);
      });
  }, [postList, sortByDesc]);

  useEffect(() => {
    handleGetPosts();
    // eslint-disable-next-line no-sparse-arrays
  }, [, sortByDesc]);

  return (
    <div className="main__wrapper">
      {!loadind && postList.length !== 0 && !serverError &&
        <button onClick={swapSort} className="btn main__button">
          {sortByDesc ? 'Fresh first' : 'Old first'}
        </button>
      }
      {loadind ?
        <div className="main__preloader">Loading...</div> :
        postList.length !== 0 && !serverError ?
          <PostsList postList={postList} /> :
          postList.length === 0 && !serverError ?
            <div className="main__preloader">Post not found</div> :
            <div className="main__preloader">
              {throttleViolation ? 'So many request' : 'Server error'}
            </div>
      }
    </div >
  );
}

export default Main;
