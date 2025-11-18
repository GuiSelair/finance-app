import { useEffect, useState } from 'react';
import { Funnel as FunnelIcon, MagnifyingGlass as MagnifyingGlassIcon } from 'phosphor-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { TextInput } from '@/components/Form/TextInput';
import { Button, Checkbox, Flex, Popover, Spinner, Text, RadioGroup } from '@/components';

import {
	FilterButton,
	FilterContainer,
	FilterMenuClearButton,
	FilterMenuContainer,
	FilterMenuContent,
	FilterMenuCountContainer,
	FilterMenuHeader,
	FiltersDetailsContainer,
	SearchBarContainer,
} from './ExpensesTableFilters.styles';
import { useDebounce } from '@/hooks/useDebounce';
import { useListCardsApi } from '@/hooks/api/cards/useListCards.api';
import { EExpensesTypesFilter } from '../../../../constants/expensesFilters';
import { ExpenseInMonth } from '@/models/ExpenseInMonth';
import { formatCurrency } from '@/helpers/formatCurrency';

type Filter = {
	type: 'search' | 'cards' | 'expenses';
	value: string;
};

type OnModifyFilterOnSearchParams = (filters: Filter[]) => void;

interface IExpensesTableFiltersProps {
	expenses?: ExpenseInMonth[];
}

export function ExpensesTableFilters({ expenses }: Readonly<IExpensesTableFiltersProps>) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const hasAppliedFilters = searchParams.size > 0;

	function handleModifyFilterOnSearchParams(filters: Filter[]) {
		const params = new URLSearchParams(searchParams.toString());

		filters.forEach(filter => {
			const isValueEmptyOrRemoved = !filter.value?.trim();
			if (isValueEmptyOrRemoved) {
				params.delete(filter.type);
			} else {
				params.set(filter.type, filter.value);
			}
		});

		const hasFilters = params.toString() !== '';
		router.push(hasFilters ? `?${params.toString()}` : '', { scroll: false });
	}

	const totalExpensesValue = expenses?.reduce((acc, expense) => acc + expense.valueParcel, 0) ?? 0;

	return (
		<FilterContainer>
			<SearchBarContainer>
				<SearchBar onModifyFilterOnSearchParams={handleModifyFilterOnSearchParams} />
				<Popover
					overlay={<FilterMenu onModifyFilterOnSearchParams={handleModifyFilterOnSearchParams} />}
					sideOffset={8}
					maxWidth={800}
				>
					<FilterButton type="button">
						<FunnelIcon size={24} />
						Filtros
						{hasAppliedFilters && (
							<FilterMenuCountContainer>
								<Text size="xs" weight="600" color="white">
									{searchParams.size}
								</Text>
							</FilterMenuCountContainer>
						)}
					</FilterButton>
				</Popover>
			</SearchBarContainer>
			{hasAppliedFilters && (
				<FiltersDetailsContainer>
					<Text size="small" color="gray300" weight="500">
						Exibindo {expenses?.length} despesa(s) com total de {formatCurrency(totalExpensesValue)}
					</Text>
				</FiltersDetailsContainer>
			)}
		</FilterContainer>
	);
}

function SearchBar({ onModifyFilterOnSearchParams }: { onModifyFilterOnSearchParams: OnModifyFilterOnSearchParams }) {
	const [search, setSearch] = useState('');

	const debouncedSearch = useDebounce(search, 700);

	useEffect(() => {
		onModifyFilterOnSearchParams([{ type: 'search', value: debouncedSearch.toLowerCase() }]);
	}, [debouncedSearch]);

	return (
		<TextInput
			icon={() => <MagnifyingGlassIcon size={24} />}
			placeholder="Pesquise pelo nome da despesa"
			value={search}
			onChange={e => setSearch(e.target.value)}
		/>
	);
}

function FilterMenu({ onModifyFilterOnSearchParams }: { onModifyFilterOnSearchParams: OnModifyFilterOnSearchParams }) {
	const searchParams = useSearchParams();
	const { data: cards, isLoading: isLoadingCards } = useListCardsApi();

	const isCardsEmpty = !isLoadingCards && !cards?.length;

	function handleApplyFilters(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const activeCardsFilters = Array.from(formData.keys()).reduce((acc, key) => {
			const [category, value] = key.split(':');

			if (!acc[category]) {
				acc[category] = [];
			}

			acc[category].push(value);
			return acc;
		}, {} as Record<string, string[]>);

		const filtersToApply: Filter[] = [];

		if (activeCardsFilters?.cards?.length) {
			filtersToApply.push({ type: 'cards', value: activeCardsFilters.cards.join(',') });
		} else {
			filtersToApply.push({ type: 'cards', value: '' });
		}

		if (formData.get('expenses')) {
			filtersToApply.push({ type: 'expenses', value: formData.get('expenses') as string });
		} else {
			filtersToApply.push({ type: 'expenses', value: '' });
		}

		onModifyFilterOnSearchParams(filtersToApply);
	}

	function checkIfFilterIsActive(filter: Filter) {
		const filterValue = searchParams.get(filter.type);

		if (filterValue && filterValue.includes(filter.value)) {
			return true;
		}

		return false;
	}

	function handleClearFilters() {
		onModifyFilterOnSearchParams([
			{ type: 'cards', value: '' },
			{ type: 'expenses', value: '' },
		]);
	}

	return (
		<FilterMenuContainer>
			<FilterMenuHeader>
				<Text size="medium" weight="600" color="green800">
					Filtros
				</Text>
				<Flex gap="0.5rem">
					<FilterMenuClearButton form="filter-form" type="reset" size="xs" variant="link" onClick={handleClearFilters}>
						Limpar filtros
					</FilterMenuClearButton>
					<Button form="filter-form" type="submit" size="sm" variant="ghost">
						Aplicar
					</Button>
				</Flex>
			</FilterMenuHeader>
			<FilterMenuContent as="form" id="filter-form" onSubmit={handleApplyFilters}>
				{!isCardsEmpty && (
					<Flex flexDirection="column" gap="0.5rem">
						<Text size="small">Meios de pagamentos:</Text>
						{isLoadingCards ? (
							<Spinner size="sm" />
						) : (
							<Flex flexDirection="column" gap="0.25rem">
								{cards?.map(card => (
									<Checkbox
										key={card.id}
										id={card.id}
										name={`cards:${card.slug}`}
										defaultChecked={checkIfFilterIsActive({ type: 'cards', value: card.slug })}
									>
										<Checkbox.Label>{card.name}</Checkbox.Label>
									</Checkbox>
								))}
							</Flex>
						)}
					</Flex>
				)}
				<Flex flexDirection="column" gap="0.5rem">
					<Text size="small">Exibir despesas:</Text>
					<Flex flexDirection="column" gap="0.25rem">
						<RadioGroup name="expenses" defaultValue={searchParams.get('expenses') || ''}>
							<RadioGroup.Item value={EExpensesTypesFilter.UNIQUE} id="unique">
								<RadioGroup.Label>Únicas</RadioGroup.Label>
							</RadioGroup.Item>
							<RadioGroup.Item value={EExpensesTypesFilter.MULTIPLE} id="multiple">
								<RadioGroup.Label>Parceladas</RadioGroup.Label>
							</RadioGroup.Item>
							<RadioGroup.Item value={EExpensesTypesFilter.FIXED} id="fixed">
								<RadioGroup.Label>Recorrentes</RadioGroup.Label>
							</RadioGroup.Item>
						</RadioGroup>
					</Flex>
				</Flex>
			</FilterMenuContent>
		</FilterMenuContainer>
	);
}
