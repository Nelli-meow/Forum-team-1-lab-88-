import { IPost } from '../../../../types';
import React from 'react';
import Post from './Post/Post.tsx';

interface Props {
  posts: IPost[];
}

const Posts:React.FC<Props> = ({posts}) => {
  return (
    <>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
};

export default Posts;