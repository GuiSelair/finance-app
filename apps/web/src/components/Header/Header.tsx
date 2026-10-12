import Image from 'next/image';
import { SignOut as SignOutIcon } from 'phosphor-react';

import { useNavigation } from '@/hooks/useNavigation';
import { NavLink } from '@/components/NavLink';
import { NavigationDropmenu } from '@/components/NavigationDropmenu';

import { HeaderContainer, Logo, AddExpenseLink, SystemOptions, PrimaryNavigation } from './Header.styles';
import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '@/contexts/AuthContext';
import { Dropmenu } from '../Dropmenu';
import { Flex } from '../Flex';
import { Text } from '../Text';

export function Header(): JSX.Element {
	const { primaryPageSelected, sessionPageSelected, primaryNavigationMapper, makePath } = useNavigation();
	const onSignOut = useContextSelector(AuthContext, context => context.onSignOut);

	const primaryMenuItems = Object.entries(primaryNavigationMapper)
		.filter(([, value]) => value?.visible ?? true)
		.map(([primaryPagesKey, value]) => ({
			href: makePath({
				primaryPageToSelect: primaryPagesKey,
				navigationToSelect: value,
			}),
			label: value.name ?? value.title.toLowerCase(),
			isActive: primaryPageSelected === primaryPagesKey,
		}));

	return (
		<HeaderContainer>
			<div>
				<Logo href="/">
					<strong>Finance</strong>.app
				</Logo>
				<PrimaryNavigation>
					{primaryMenuItems.map(item => (
						<NavLink key={item.href} href={item.href} prefetch={false} isActive={item.isActive}>
							{item.label}
						</NavLink>
					))}
				</PrimaryNavigation>
			</div>
			<div>
				<AddExpenseLink href="/registrations/expenses" prefetch={false}>
					Adicionar despesa
				</AddExpenseLink>
				<NavigationDropmenu
					label="Abrir menu principal"
					align="end"
					items={[
						...primaryMenuItems,
						{
							href: '/registrations/expenses',
							label: 'Adicionar despesa',
							isActive: primaryPageSelected === 'registrations' && sessionPageSelected === 'expenses',
							separated: true,
						},
					]}
				/>
				<SystemOptions>
					<Dropmenu.Root>
						<Dropmenu.Trigger>
							<Image src="https://www.github.com/guiselair.png" alt="" width={48} height={48} />
						</Dropmenu.Trigger>
						<Dropmenu.Content>
							<Dropmenu.Item onSelect={onSignOut}>
								<Flex gap="4px" alignItems="center">
									<SignOutIcon />
									<Text weight="500">Sair</Text>
								</Flex>
							</Dropmenu.Item>
						</Dropmenu.Content>
					</Dropmenu.Root>
				</SystemOptions>
			</div>
		</HeaderContainer>
	);
}
