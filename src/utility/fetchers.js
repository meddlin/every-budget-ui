import useSWR from 'swr';
import { API_URL } from './constants';


const fetcher = (...args) => fetch(...args).then(res => res.json());


const useCategories = () => {
    const { data, error, isLoading } = useSWR(`${API_URL}/api/Categories/Get`, fetcher);

    return {
        fetchedCategories: data ? data : [],
        isLoadingCategories: isLoading,
        isErrorCategories: error
    };
}

export {
    useCategories
}