import React, { ChangeEvent, FormEvent, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Alert, Button, TextField } from '@mui/material';
import { CommentMutation } from '../../../../types';
import { useAppSelector } from '../../../../app/hooks.ts';
import { selectAddLoading } from '../../commentsSlice.ts';
import ButtonSpinner from '../../../../components/UI/ButtonSpinner/ButtonSpinner.tsx';

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
  const loading = useAppSelector(selectAddLoading);

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();

    if (comment.text.trim().length === 0) {
      setAlert('Text is required!');
      return;
    }

    onSubmit({...comment, post: postId});
    setComment(initialState);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment({...comment, [e.target.name]: e.target.value});
  };

  return (
    <>
      <form
        onSubmit={submitFormHandler}
      >
        <Grid container spacing={2} sx={{mx: 'auto', width: '100%'}}>
          {alert && (
            <Alert severity="error" sx={{mt: 3, width: '100%'}}>
              {alert}
            </Alert>
          )}
          <Grid container spacing={1} alignItems="center" size={12}>
            <Grid size={12}>
              <TextField
                multiline
                sx={{width: '100%', backgroundColor: 'rgba(249,250,251,0.91)'}}
                variant="outlined"
                placeholder="Comment..."
                minRows={4}
                label="Comment"
                id="Comment"
                name="text"
                value={comment.text}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid size={2}>
              <Button
                disabled={loading}
                type="submit"
                loadingPosition="start"
                variant="contained"
                sx={{width: '100%'}}
              >
                Post
                {loading ? <ButtonSpinner/> : null}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default NewCommentForm;