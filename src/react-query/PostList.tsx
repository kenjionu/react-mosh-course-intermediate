import usePosts from "./hooks/usePosts.ts";
import {useState} from "react";
import React from "react";

const postList = () => {
    const pageSize = 10;
    const [page, setPage] = useState(1);
    const {data, error, isLoading, fetchNextPage, isFetchingNextPage} = usePosts({pageSize});
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    return (
        <>
            <ul className='list-group'>
                {data?.pages?.map((page, index) => (
                    <React.Fragment key={index}>
                    {page.map((post) => (
                        <li key={post.id} className="list-group-item">
                            {post.title}
                        </li>
                    ))}
                    </React.Fragment>
                ))}
            </ul>
            <button
                className="btn btn-primary my-3 ms-1"
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
            >
                {isFetchingNextPage ? 'Loading...' : 'Load more'}
            </button>
        </>
    );
}

export default postList;