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


  const imageLength = state.image !== '';
  const descriptionLength = state.description.length > 0;

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
            disabled={imageLength}
          />
        </Grid>
        <Grid size={12}>
          <FileFormInput
            getImage={getImage}
            label="Image"
            name="image"
            descriptionLength={descriptionLength}
          />
        </Grid>
        {
          state.image && !state.description ? (
            <Alert severity="info" sx={{mt: 3, width: '100%'}}>
              Description is not required since an image is provided.
            </Alert>
          ) : (
            state.description && !state.image && (
              <Alert severity="info" sx={{mt: 3, width: '100%'}}>
                Image is not required since a description is provided.
              </Alert>
            )
          )
        }
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