import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Alert, Button, TextField, Typography } from '@mui/material';
import { PostMutation } from '../../../../types';
import FileFormInput from '../../../../../src/components/UI/FileForm/FileFormInput.tsx';
import ButtonSpinner from '../../../../components/UI/ButtonSpinner/ButtonSpinner.tsx';

export interface Props {
  onSubmit: (post: PostMutation) => void;
  isLoading: boolean;
}

const NewPostForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const [state, setState] = useState<PostMutation>({
    title: '',
    description: '',
    image: null,
  });

  const [alert, setAlert] = useState<string>('');

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (state.title.trim().length === 0) {
      setAlert('Title is required!');
      return;
    }

    if (state.description.trim().length === 0 && !state.image) {
      setAlert('Select image or description or both');
      return;
    }

    onSubmit({...state});
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setState(prevState => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <form
      onSubmit={submitFormHandler}
      style={{
        backgroundColor: 'rgba(245,245,245,0.84)',
        margin: '10px auto',
        padding: '10px 10px 40px 10px',
        width: '70%',
        borderRadius: '5px'
      }}
    >
      <Typography variant="body1" sx={{width: '100%', fontSize: '50px',  color: 'rgba(41,43,42,0.82)', textAlign: 'center'}}>New Post</Typography>
      <Grid container spacing={2} sx={{mx: 'auto', width: '80%'}}>
        {alert && (<Alert severity="error" sx={{width: '100%' }}>{alert}</Alert>)}
          <Grid size={12}>
            <TextField
              sx={{width: '100%'}}
              variant="outlined"
              label="Title"
              id="title"
              name="title"
              value={state.title}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              multiline
              sx={{width: '100%'}}
              variant="outlined"
              placeholder="description"
              minRows={2}
              label="Description"
              id="description"
              name="description"
              value={state.description}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid size={12}>
            <FileFormInput
              getImage={getImage}
              label="Image"
              name="image"
            />
          </Grid>
          <Grid size={12}>
            <Button
              sx={{width: '100%'}}
              type="submit"
              disabled={isLoading}
              variant="contained"
            >
              Create
              {isLoading && <ButtonSpinner/>}
            </Button>
          </Grid>
        </Grid>
      </form>
  );
};

export default NewPostForm;