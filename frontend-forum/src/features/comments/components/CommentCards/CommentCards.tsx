import { IComment } from '../../../../types';
import React from 'react';
import CommentCard from './CommentCard/CommentCard.tsx';
import Box from '@mui/joy/Box';

interface Props {
  comments: IComment[];
}

const CommentCards:React.FC<Props> = ({comments}) => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
      {comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </Box>
  );
};

export default CommentCards;