import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import React from 'react';
import { IComment } from '../../../../../types';

interface Props {
  comment: IComment;
}

const CommentCard:React.FC<Props> = ({comment}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        overflow: 'auto',
        resize: 'horizontal',
        margin: '20px'
      }}
    >
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Avatar src="/static/images/avatar/1.jpg" size="lg" />
      </Box>
      <CardContent>
        <Typography level="title-lg">{comment.user.username}</Typography>
        <Typography level="body-sm">{comment.text}</Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCard;