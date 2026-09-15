import "../../../../css/merkit/home/article-css/articleHome.css"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export default function ArticleLoading({qty}) {
    return (
        <div className="articleLoading wd">
            {
                Array(qty).fill(null).map((_, index) => (
                    <div key={index} className="memory-skeleton wd">
                        <div className="memory-skeleton-line"></div>
                        <div className="memory-skeleton-header">
                            <Skeleton circle width={52} height={52} />
                            <Skeleton width={115} height={29} borderRadius={10} />
                        </div>
                        <div className="memory-skeleton-content">
                            <div className="memory-skeleton-text">
                                <Skeleton width="65%" height={25} />
                                <Skeleton width="95%" height={18} />
                                <Skeleton width="90%" height={18} />
                                <Skeleton width="70%" height={18} />
                                <div className="memory-skeleton-sign">
                                    <Skeleton width={65} height={16} />
                                </div>
                                <div className="memory-skeleton-images uuxx">
                                    <Skeleton width={125} height={83} borderRadius={6} />
                                    <Skeleton width={125} height={83} borderRadius={6} />
                                </div>
                            </div>
                            <div className="memory-skeleton-images xxuu">
                                <Skeleton width={125} height={83} borderRadius={6} />
                                <Skeleton width={125} height={83} borderRadius={6} />
                                <Skeleton width={125} height={83} borderRadius={6} />
                            </div>
                        </div>
                        <div className="memory-skeleton-reactions">
                            <div>
                                <Skeleton width={55} height={20} />
                                <Skeleton width={55} height={20} />
                            </div>
                            <div>
                                <Skeleton width={25} height={25} />
                                <Skeleton width={25} height={25} />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )

}