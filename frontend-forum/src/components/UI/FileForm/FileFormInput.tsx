import { useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import * as React from 'react';
import Grid from '@mui/material/Grid2';

interface  Props {
  name: string;
  label: string;
  getImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileFormInput:React.FC<Props> = ({label, name, getImage}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileImage, setFileImage] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileImage(e.target.files[0].name);
    } else {
      setFileImage('');
    }

    getImage(e);
  };

  const inputActivate = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{display: 'none'}}
        type="file"
        name={name}
        onChange={onChange}
        ref={inputRef}
      />
      <Grid size={12}>
        <TextField
          disabled
          sx={{width: '100%'}}
          id="title"
          label={label}
          name="title"
          variant="outlined"
          value={fileImage}
          onClick={inputActivate}
        />
      </Grid>
      <Grid size={12} sx={{marginTop: '20px'}}>
        <Button
          sx={{width: '100%'}}
          variant="contained"
          type="button"
          onClick={inputActivate}
          color="success"
        >
          Get file
        </Button>
      </Grid>
    </>
  );
};

export default FileFormInput;