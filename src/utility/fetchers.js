import useSWR from 'swr';
import { API_URL } from './constants';


const fetcher = (...args) => fetch(...args).then(res => res.json());

const useBudget = () => {
    const { data, error, isLoading } = useSWR(`${API_URL}/api/Budgets/Get`, fetcher);

    return {
        budget: data ? data : {},
        isLoadingBudget: isLoading,
        isErrorBudget: error
    }
}

const useBudgetItems = () => {
    const { data, error, isLoading } = useSWR(`${API_URL}/api/BudgetItems/Get`, fetcher);

    return {
        budgetItems: data ? data : {},
        isLoadingBudgetItems: isLoading,
        isErrorBudgetItems: error
    }
}

const useCategories = () => {
    const { data, error, isLoading } = useSWR(`${API_URL}/api/Categories/Get`, fetcher);

    return {
        fetchedCategories: data ? data : [],
        isLoadingCategories: isLoading,
        isErrorCategories: error
    };
}

const useTransactions = () => {
    const { data, error, isLoading } = useSWR(`${API_URL}/api/Transactions/Get`, fetcher);

    return {
        fetchedTransactions: data ? data : [],
        isLoadingTransactions: isLoading,
        isErrorTransactions: error
    };
};

export {
    useBudget,
    useBudgetItems,
    useCategories,
    useTransactions
}