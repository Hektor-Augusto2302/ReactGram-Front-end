import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LikeContainer from "../../components/LikeContainer/LikeContainer";
import CommentPhotos from "../../components/CommentPhotos/CommentPhotos";
import { useQuery } from "../../hooks/useQuery";
import { comment, likePhoto, searchPhotos } from "../../slices/photoSlice";
import { uploads } from "../../utils/config";

const Search = () => {
    const query = useQuery();
    const search = query.get("q");
    const [commentText, setCommentText] = useState('');

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { photos } = useSelector((state) => state.photo);

    useEffect(() => {
        dispatch(searchPhotos(search))
    }, [dispatch, search]);

    const handleLike = (photoId) => {
        dispatch(likePhoto(photoId));
    };

    const handleComment = (photoId, commentText) => {
        dispatch(comment({ id: photoId, comment: commentText }));
        setCommentText("");
    };

    return (
        <div className='container my-5'>
            <div className="row justify-content-center d-flex flex-column align-items-center">
                {photos.map((photo) => (
                    <div className="col-md-6 my-3" key={photo._id}>
                        <div className="card bg-dark">
                            <img
                                src={`${uploads}/photos/${photo.image}`}
                                className="img-fluid mb-3"
                                alt={photo.title}
                            />
                            <h2 className='mb-3 text-center'>{photo.title}</h2>
                            <LikeContainer
                                className="mb-3"
                                photo={photo}
                                user={user}
                                handleLike={() => handleLike(photo._id)}
                            />
                            <h3 className='my-3 text-center'>Criado por: {photo.userName}</h3>
                            <CommentPhotos
                                photo={photo}
                                uploads={uploads}
                                handleComment={() => handleComment(photo._id, commentText)}
                                commentText={commentText}
                                setCommentText={setCommentText}
                            />

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Search