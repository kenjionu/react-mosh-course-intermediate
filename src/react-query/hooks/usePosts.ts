import {useInfiniteQuery,} from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
}
interface PostQuery {
    pageSize: number;
}
const usePosts = (query: PostQuery) => useInfiniteQuery<Post[], Error>({
    queryKey: ['posts', query],
    queryFn: ({pageParam = 1 }) => axios
        .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _start: (pageParam -1 ) * query.pageSize,
                _limit: query.pageSize,
            }
        })
    .then((res) => res.data),
    staleTime: 10 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.length > 0  ? allPages.length + 1 : undefined;
    }
});

export default usePosts;