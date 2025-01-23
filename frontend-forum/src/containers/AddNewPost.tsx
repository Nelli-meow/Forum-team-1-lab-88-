import {Typography} from '@mui/material';
import NewPostForm from '../features/posts/components/NewPostForm/NewPostForm.tsx';
import {useAppDispatch, useAppSelector} from '../app/hooks.ts';
import {createPost} from '../features/posts/PostsThunk.ts';
import {PostMutation} from '../types';
import {useNavigate} from 'react-router-dom';
import {selectAddPostLoading} from '../features/posts/PostsSlice.ts';
import {selectUser} from '../features/users/UsersSlice.ts';

const AddNewPost = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isCreating = useAppSelector(selectAddPostLoading);
    const user = useAppSelector(selectUser);

    const onFormSubmit = async (post: PostMutation) => {
        if (user !== null) {
            await dispatch(createPost({post, token: user.token}));
            navigate('/');
        }
    };

    return (
        <>
            <Typography variant="body1"
                        sx={{width: '100%', fontSize: '80px', color: 'white', marginTop: '20px', textAlign: 'center'}}>New
                Post</Typography>
            <NewPostForm isLoading={isCreating} onSubmit={onFormSubmit}/>
        </>
    );
};

export default AddNewPost;