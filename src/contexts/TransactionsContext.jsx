import { createContext, useState, useEffect } from "react";
import { api } from "../lib/axios";

export const TransactionsContext = createContext({});

export function TransactionsProvider({ children }) {
    const [transactions, setTransactions] = useState([]);

    async function fetchTransactions(search) {
        const res = await api.get('transactions', {
            params: {
                q: search
            }
        })

        setTransactions(res.data);
    }

    useEffect(() => {
        fetchTransactions();
    }, [])

    return (
        <TransactionsContext.Provider value={{ 
            transactions,
            fetchTransactions
        }}>
            { children }
        </TransactionsContext.Provider>
    )
}