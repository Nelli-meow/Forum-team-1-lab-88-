import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { TextField } from '@mui/material';
import { PostMutation } from '../types';
import { LoadingButton } from '@mui/lab';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FileFormInput from './FileFormInput.tsx';

export interface Props {
  onSubmit: (post: PostMutation) => void;
  isLoading: boolean;
}

const NewPostForm: React.FC<Props> = ({onSubmit, isLoading}) => {

  const [state, setState] = useState<PostMutation>({
    title: '',
    description: '',
    image: '',
  });

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
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
    <form onSubmit={submitFormHandler} style={{
      margin: '20px 10px',
      padding: '20px 10px',
    }}>
      <Grid container spacing={2} sx={{mx: 'auto', width: '80%'}}>
        <Grid size={12}>
          <TextField
            sx={{width: '100%'}}
            variant="outlined"
            required
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
            minRows={3}
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
          <LoadingButton
            type="submit"
            loading={isLoading}
            loadingPosition="start"
            startIcon={<PostAddIcon />}
            variant="contained"
          >
            <span>Create</span>
          </LoadingButton>
        </Grid>
      </Grid>
    </form>

  );
};

export default NewPostForm;