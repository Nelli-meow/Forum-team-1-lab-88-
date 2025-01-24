import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { IPost } from '../../../../../types';
import React from 'react';
import messageImg from '../../../../../assets/message.png';
import { mainApiUrl } from '../../../../../globalConstants.ts';
import dayjs from 'dayjs';
import { Box, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';

interface Props {
  post: IPost;
}

const Post:React.FC<Props> = ({post}) => {
  const navigate = useNavigate();
  let postImage = messageImg;

  if (post.image) {
    postImage = mainApiUrl + '/' + post.image;
  }

  return (
    <Card orientation="horizontal" variant="outlined" sx={{ width: '80%', margin: '20px auto', backgroundColor: 'rgba(245,245,245,0.87)' }}>
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: '150px'}}>
          <img
            style={{height: '100%'}}
            src={postImage}
            srcSet={postImage}
            loading="lazy"
            alt={post.title}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Box sx={{margin: '0', display: 'flex', alignItems: 'center', width: '98%', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <AccessTimeIcon fontSize={'small'}/>
            <Typography noWrap sx={{letterSpacing: -0.25, color: 'text.secondary', fontSize: 15, marginLeft: '8px'}}>{dayjs(post.created_at).format(' HH:mm:ss')}</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <CalendarMonthIcon fontSize={'small'}/>
            <Typography noWrap sx={{letterSpacing: -0.25, color: 'text.secondary', fontSize: 15, marginLeft: '8px'}}>{dayjs(post.created_at).format('DD.MM.YYYY')}</Typography>
          </Box>
        </Box>
        <Button variant="text" onClick={() => navigate(`/posts/${post._id}`)} sx={{color: 'green', fontSize: '16px', display: 'flex', justifyContent: 'start', wordWrap: 'break-word', '&:hover': {color: 'rgb(49,172,239)'}, marginTop: '10px'}}>{post.title}</Button>
        <Typography noWrap sx={{letterSpacing: -0.25, color: 'text.secondary', fontSize: 18, marginLeft: '10px'}}>By: <b>{post.user.username}</b></Typography>
      </CardContent>
    </Card>
  );
};

export default Post;