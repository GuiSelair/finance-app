import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';

import { SharePeopleFormType } from '@/pages/registrations/share-people/constants/formSchema';
import { httpClient } from '@/providers/HTTPClient';
import { SharePeople } from '@/models/SharePeople';

export type DisableSharePeopleInput = SharePeopleFormType & { id: number };

export function useDisableSharePeopleApi() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: number) => {
			await httpClient.delete(`/share-people/${id}`);
			return id;
		},
		onSuccess: id => {
			toast.success('Pessoa desabilitada com sucesso!');
			queryClient.setQueryData(['share-people'], (oldData: SharePeople[] | undefined) => {
				if (!oldData) return [];

				return oldData.filter(sharePerson => sharePerson.id !== id);
			});
		},
		onError: () => {
			toast.error('Não foi possível desabilitar a pessoa divisora. Verifique os dados e tente novamente.');
		},
	});
}
