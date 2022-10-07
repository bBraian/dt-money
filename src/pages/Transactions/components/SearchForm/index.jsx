import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

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

    const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
        return context.fetchTransactions;
    });

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