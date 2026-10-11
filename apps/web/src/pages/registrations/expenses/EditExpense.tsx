import React from 'react';
import { FormProvider, Controller } from 'react-hook-form';

import { LayoutBox, SEO, Flex, Spinner, Switch } from '@/components';
import { TextInput, InputLabel, ActionButtons } from '@/components/Form';

import { PaymentMethodSelectionSection } from './components/PaymentMethodSelection';
import { useEditExpense } from './hooks/useEditExpense';
import { ExpenseField, ExpenseSwitches, ExpenseValuesRow, RegisterExpenseForm, ValueInput } from './ExpenseForm.styles';

export default function EditExpensePage() {
	const { editExpenseSubmit, goBack, isEditing, formSchema, isLoading, isParceled } = useEditExpense();

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
	} = formSchema;

	if (isLoading) {
		return (
			<>
				<SEO title="Edição de despesa" />
				<LayoutBox>
					<LayoutBox.Header>
						<LayoutBox.HeaderTitle>Editar despesa</LayoutBox.HeaderTitle>
					</LayoutBox.Header>
					<LayoutBox.Content>
						<Flex justifyContent="center" alignItems="center" height="100%" gap="0.5rem">
							<Spinner size="md" mode="dark" />
							Buscando informações da despesa...
						</Flex>
					</LayoutBox.Content>
				</LayoutBox>
			</>
		);
	}

	return (
		<FormProvider {...formSchema}>
			<SEO title="Edição de despesa" />
			<LayoutBox>
				<LayoutBox.Header>
					<LayoutBox.HeaderTitle>Editar despesa</LayoutBox.HeaderTitle>
				</LayoutBox.Header>
				<LayoutBox.Content>
					<RegisterExpenseForm>
						<Flex>
							<InputLabel>
								Nome:
								<TextInput
									placeholder="Insira o nome de sua despesa aqui"
									error={errors.name?.message}
									{...register('name')}
								/>
							</InputLabel>
						</Flex>

						<PaymentMethodSelectionSection isEditMode />

						<ExpenseValuesRow>
							<ExpenseField>
								<InputLabel>
									Valor total:
									<ValueInput
										prefix="R$"
										error={errors.totalValue?.message}
										disabled={isParceled}
										{...register('totalValue')}
									/>
								</InputLabel>
							</ExpenseField>
							<ExpenseField>
								<InputLabel>
									Parcelas:
									<ValueInput
										error={errors.parcelQuantity?.message}
										disabled
										{...register('parcelQuantity', {
											valueAsNumber: true,
										})}
									/>
								</InputLabel>
							</ExpenseField>
							<ExpenseField>
								<InputLabel>
									Valor por parcela:
									<ValueInput prefix="R$" {...register('parcelValue')} />
								</InputLabel>
							</ExpenseField>
							<ExpenseSwitches>
								<Flex flexDirection="column" gap="0.5rem" whiteSpace="nowrap">
									<InputLabel>Despesa fixa:</InputLabel>
									<Controller
										name="isRecurring"
										render={({ field: { value, ...field } }) => <Switch checked={value} {...field} />}
									/>
								</Flex>
							</ExpenseSwitches>
						</ExpenseValuesRow>
					</RegisterExpenseForm>
				</LayoutBox.Content>
				<LayoutBox.Footer>
					<LayoutBox.FooterRightSide>
						<ActionButtons>
							<ActionButtons.Cancel onClick={goBack} />
							<ActionButtons.Submit
								onClick={handleSubmit(editExpenseSubmit)}
								isLoading={isEditing}
								isDisabled={!isDirty}
								spinnerConfig={{ mode: 'light', size: 'sm' }}
							>
								Editar despesa
							</ActionButtons.Submit>
						</ActionButtons>
					</LayoutBox.FooterRightSide>
				</LayoutBox.Footer>
			</LayoutBox>
		</FormProvider>
	);
}
