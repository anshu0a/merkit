import "../../../../css/merkit/home/article-css/articleList.css"
import OneArticle from "./OneArticle"

const articles = [
    {
        id: 1,
        title: "The Beauty of Small Moments",
        article: "Sometimes the smallest moments become the memories we remember forever. A quiet evening, a meaningful conversation, or a simple smile can make an ordinary day special.",
        userimg: "https://i.pravatar.cc/150?img=12",
        username: "carav_sharma",
        date: "2025-09-08T00:30:25.000Z",
        imgs: [
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
        ],
        hashtag: "#Memories",
        emojie: ["❤️","❔"],
        likes: 128,
        name:"anshu",
        comment:23
    },
    {
        id: 2,
        title: "A Journey Worth Remembering",
        article: "Every journey teaches us something new. The places we visit, people we meet, and unexpected experiences along the way slowly become a part of our story.",
        userimg: "https://i.pravatar.cc/150?img=32",
        username: "ananya.verma",
        date: "2026-09-08T00:30:25.000Z",
        imgs: [
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
        ],
        hashtag: "#Travel",
        emojie: ["💔", "👎"],
        likes: 246,
        name:"sam",
        comment:98
    },
    {
        id: 3,
        title: "Dreams Start With One Step",
        article: "Big dreams don't happen overnight. They begin with a small decision to keep moving forward, even when the path feels uncertain.",
        userimg: "https://i.pravatar.cc/150?img=47",
        username: "gohan._.mehta",
        date: "2026-09-07T14:30:25.000Z",
        imgs: [
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
        ],
        hashtag: "#Dreams",
        emojie: ["✔️"],
        likes: 391,
        name:"harry",
        comment:34
    }
];

export default function ArticleList() {
    return (
        <div className="articleList isFlex wd">
            {articles.map((data) => (
                <OneArticle key={data.id} data={data} />
            ))}
        
        </div>
    )
}