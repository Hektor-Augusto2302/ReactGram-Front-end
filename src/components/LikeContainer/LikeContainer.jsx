import { BsHeart, BsHeartFill } from "react-icons/bs";

const LikeContainer = ({photo, user, handleLike}) => {

    return (
        <div className="d-flex justify-content-center">
            {photo.likes && user && (
                <>
                    {photo.likes.includes(user._id) ? (
                        <BsHeartFill className="mt-1" type="button" />
                    ) : (
                        <BsHeart className="mt-1" type="button" onClick={handleLike}/>
                    )}
                    <p className="ms-2">{photo.likes.length} like(s)</p>
                </>
            )}
        </div>
    )
}

export default LikeContainer