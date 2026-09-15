import "../../../../css/merkit/home/article-css/articleHome.css"
import ArticleList from "./ArticleList"
import ArticleLoader from "./ArticleLoader"

export default function ArticleHome(){
    return (
        <div className="articleHome isFlex wd">
           <ArticleList />
           <ArticleLoader qty={1} />

        </div>
    )
}