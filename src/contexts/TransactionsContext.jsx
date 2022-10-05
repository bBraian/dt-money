import { createContext, useState, useEffect } from "react";

export const TransactionsContext = createContext({});

export function TransactionsProvider({ children }) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/transactions')
            .then(res => res.json())
            .then(data => {
                setTransactions(data);
            })
    }, [])

    return (
        <TransactionsContext.Provider value={{ transactions }}>
            { children }
        </TransactionsContext.Provider>
    )
}