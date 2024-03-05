import { getPhoto, likePhoto, resetMessage, comment } from '../../slices/photoSlice';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Photo.css';
import CardPhotos from './components/CardPhotos/CardPhotos';
import LikeContainer from '../../components/LikeContainer/LikeContainer';
import CommentPhotos from '../../components/CommentPhotos/CommentPhotos';
import Message from '../../components/Message/Message';
import { uploads } from '../../utils/config';

const Photo = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const { photo, loading, error, message } = useSelector((state) => state.photo);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);

    if (loading) {
        return <p>Carregando...</p>;
    };

    const handleLike = () => {
        dispatch(likePhoto(photo._id));

        setTimeout(() => {
            dispatch(resetMessage());
        }, 3000);
    };

    const handleComment = (e) => {
        e.preventDefault();

        const commentData = {
            comment: commentText,
            id: photo._id
        };

        dispatch(comment(commentData));

        setCommentText("");

        dispatch(resetMessage());

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card bg-dark">
                        <CardPhotos
                            photo={photo}
                        />
                        <LikeContainer
                            photo={photo}
                            user={user}
                            handleLike={handleLike}
                        />
                        <div className='px-5 mb-3'>
                            {error && <Message msg={error} type='error' />}
                            {message && <Message msg={message} type='success' />}
                        </div>
                        <CommentPhotos 
                            photo={photo}
                            uploads={uploads}
                            handleComment={handleComment}
                            commentText={commentText}
                            setCommentText={setCommentText}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Photo;