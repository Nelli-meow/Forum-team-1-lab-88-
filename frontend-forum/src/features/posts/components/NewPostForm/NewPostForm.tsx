import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Alert, Button, TextField } from '@mui/material';
import { PostMutation } from '../../../../types';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FileFormInput from '../../../../../src/components/UI/FileForm/FileFormInput.tsx';

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
            backgroundColor: 'rgba(245,245,245,0.75)',
            margin: '20px 25%',
            padding: '20px 10px',
            width: '50%',
          }}
      >
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
            <Button
                type="submit"
                loading={isLoading}
                loadingPosition="start"
                startIcon={<PostAddIcon/>}
                variant="contained"
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
  );
};

export default NewPostForm;