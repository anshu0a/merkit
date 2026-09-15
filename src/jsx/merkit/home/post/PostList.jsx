import "../../../../css/merkit/home/post/postList.css"
import OnePost from "./OnePost"


const posts = [
    {
        "id": 1,
        "username": "alex_01",
        "nickname": "Alex",
        "profileImage": "https://i.pravatar.cc/150?img=12",
        "time": "2h ago",
        "postImage": "https://picsum.photos/id/1015/800/600",
        "likes": 245,
        "comments": 32
    },
    {
        "id": 2,
        "username": "mia_smith",
        "nickname": "Mia",
        "profileImage": "https://i.pravatar.cc/150?img=32",
        "time": "5h ago",
        "postImage": "https://picsum.photos/id/1016/800/600",
        "likes": 189,
        "comments": 21
    },
    {
        "id": 3,
        "username": "ryan_dev",
        "nickname": "Ryan",
        "profileImage": "https://i.pravatar.cc/150?img=15",
        "time": "1d ago",
        "postImage": "https://picsum.photos/id/1025/800/600",
        "likes": 421,
        "comments": 57
    }
]

export default function PostList() {
    return (

        <div className="postList isFlex wd">
            {posts.map(post => (
                <div className="onePost isFlex wd" key={post.id}>
                    <OnePost post={post} />
                </div>
            ))}
        </div>
    )
}