import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from "react";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";

const searchFormSchema = z.object({
    search: z.string()
})

export function SearchForm() {
    const { 
        register, 
        handleSubmit,
        formState: { isSubmitting }
    } = useForm({
        resolver: zodResolver(searchFormSchema)
    });

    const { fetchTransactions } = useContext(TransactionsContext);

    async function handleSearchTransactions(data) {
        await fetchTransactions(data.search);
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input 
                type="text" 
                placeholder="Busque por transações" 
                {...register('search')}
            />

            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                <span>Buscar</span>
            </button>
        </SearchFormContainer>
    )
}