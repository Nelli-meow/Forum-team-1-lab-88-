import React, { ChangeEvent, FormEvent, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Alert, TextField } from '@mui/material';
import { CommentMutation } from '../../../../types';

interface Props {
  onSubmit: (comment: CommentMutation) => void;
  postId: string;
}

const initialState = {
  text: '',
};

const NewCommentForm: React.FC<Props> = ({onSubmit, postId}) => {
  const [comment, setComment] = useState(initialState);
  const [alert, setAlert] = useState<string>('');

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();

    if (comment.text.trim().length === 0) {
      setAlert('Text is required!');
      return;
    }

    onSubmit({...comment, post: postId});
    setComment(initialState);
  }

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment({...comment, [e.target.name]: e.target.value});
  }

  return (
    <>
      <form onSubmit={submitFormHandler} >
        <Grid container spacing={2} sx={{mx: 'auto', width: '80%'}}>
          {
            alert && (
              <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
                {alert}
              </Alert>
            )
          }
          <Grid size={12}>
            <TextField
              sx={{width: '100%'}}
              variant="outlined"
              label="Comment"
              id="text"
              name="text"
              value={comment.text}
              onChange={inputChangeHandler}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default NewCommentForm;