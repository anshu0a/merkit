import "../../../../css/merkit/home/article-css/articleList.css"

import { useState, useEffect } from "react";
import axios from "axios";
const server = import.meta.env.VITE_BACKEND_SERVER;

import OneArticle from "./OneArticle"

export default function ArticleList() {
    const [articles, setArticlese] = useState([]);
    const [page, setPage] = useState({ size: 5, page: 0, first: true, last: false, ttlePage: 0, empty: false });

    useEffect(() => {

        async function getAllArticle() {
            const response = await axios.get(`${server}/article/all?size=${page.size}&page=${page.page}`);
            const result = response.data;

            setArticlese(result.content)
            setPage((pre) => ({
                ...pre,
                size: result.size,
                page: result.number,
                first: result.first,
                last: result.last,
                ttlePage: result.totalPages,
                empty: result.empty
            }))

            console.log(result)

        }
        getAllArticle();

    }, [])

    return (
        <div className="articleList isFlex wd">
            {articles.map((data) => (
                <OneArticle key={data.id} data={data} />
            ))}

        </div>
    )
}