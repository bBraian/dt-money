import { useState, useEffect, useCallback } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";

export const TransactionsContext = createContext({});

export function TransactionsProvider({ children }) {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = useCallback(async (search) => {
        const res = await api.get('transactions', {
            params: {
                _sort: 'createdAt',
                _order: 'desc',
                q: search
            }
        })

        setTransactions(res.data);
    }, [])

    const createTransaction = useCallback(
        async (data) => {
            const { description, price, category, type } = data;

            const res = await api.post('transactions', {
                description, 
                price, 
                category, 
                type,
                createdAt: new Date()
            })

        setTransactions(state => [res.data, ...state]);
    }, [])

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions])

    return (
        <TransactionsContext.Provider value={{ 
            transactions,
            fetchTransactions,
            createTransaction

        }}>
            { children }
        </TransactionsContext.Provider>
    )
}