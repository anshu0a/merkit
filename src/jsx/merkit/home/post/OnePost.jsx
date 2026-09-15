
import "../../../../css/merkit/home/post/onePost.css"

export default function OnePost({ post }) {
    return (

        <>
            <div className="postDiv isFlex">
                <div className="info wd">hello</div>
                <img className="postImg" src={post.postImage} alt="Post Image" />
            </div>
            <div className="dot2 dotx"></div>
            <div className="dot1 dotx"></div>
            <img className="PostUerPic" src={post.profileImage} alt={post.username} />
        </>
    )
}