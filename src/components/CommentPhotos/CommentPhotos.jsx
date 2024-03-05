import React from 'react';
import { Link } from 'react-router-dom';
import './CommentPhotos.css'

const CommentPhotos = ({ photo, uploads, handleComment, commentText, setCommentText }) => {
    return (
        <>
            <h3 className='text-center'>Comentarios: ({photo.comments ? photo.comments.length : 0})</h3>
            <form className='text-center px-5 d-flex flex-column mb-3' onSubmit={handleComment}>
                <input
                    className='mb-3'
                    type="text"
                    placeholder='Insira seu comentário'
                    value={commentText || ""}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <input
                    type="submit"
                    value="Enviar"
                />
            </form>
            {photo.comments && photo.comments.length >= 3 ? (
                <div className="comment-container" style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {photo.comments && photo.comments.map((comment) => (
                        <div className="d-flex mx-5 my-3" key={comment.comment}>
                            <div className="mx-3">
                                {comment.userImage && (
                                    <img
                                        src={`${uploads}/users/${comment.userImage}`}
                                        alt={comment.userName}
                                        className="img-fluid img-post-photo"
                                    />
                                )}
                            </div>
                            <div className='mt-3'>
                                <Link to={`/users/${comment.userId}`}>
                                    <p className="">{comment.userName}</p>
                                </Link>
                                <p>{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="comment-container">
                    {photo.comments && photo.comments.map((comment) => (
                        <div className="d-flex mx-5 my-3" key={comment.comment}>
                            <div className="mx-3">
                                {comment.userImage && (
                                    <img
                                        src={`${uploads}/users/${comment.userImage}`}
                                        alt={comment.userName}
                                        className="img-fluid img-post-photo"
                                    />
                                )}
                            </div>
                            <div className='mt-3'>
                                <Link to={`/users/${comment.userId}`}>
                                    <p className="">{comment.userName}</p>
                                </Link>
                                <p>{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default CommentPhotos