import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { useCreateCardApi } from '@/hooks/api/cards/useCreateCard.api';
import { AVAILABLE_CARDS_OPTIONS } from '../constants/availableCardsOptions';
import { CreateCardFieldsType, createCardFormSchema } from '../constants/formSchema';

export function useCreateCards() {
	const router = useRouter();
	const formSchema = useForm<CreateCardFieldsType>({
		resolver: yupResolver(createCardFormSchema),
	});
	const { mutate, isLoading: isCreating } = useCreateCardApi();

	function handleCreateCard(data: CreateCardFieldsType) {
		mutate(data, {
			onSuccess: () => {
				router.push('/');
			},
		});
	}

	function handleCancel() {
		router.push('/');
	}

	return {
		availableCardsOptions: AVAILABLE_CARDS_OPTIONS,
		handleCancel,
		handleCreateCard,
		isCreatingCard: isCreating,
		formSchema,
	};
}
