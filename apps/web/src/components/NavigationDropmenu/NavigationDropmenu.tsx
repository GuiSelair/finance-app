import { List } from 'phosphor-react';

import { Dropmenu } from '@/components/Dropmenu';

import { HamburgerButton, MenuLink, NavigationDropmenuRoot } from './NavigationDropmenu.styles';

export interface NavigationDropmenuItem {
	href: string;
	label: string;
	isActive: boolean;
	separated?: boolean;
}

interface NavigationDropmenuProps {
	label: string;
	items: NavigationDropmenuItem[];
	align?: 'start' | 'center' | 'end';
}

export function NavigationDropmenu({ label, items, align = 'start' }: Readonly<NavigationDropmenuProps>) {
	if (!items.length) return null;

	return (
		<NavigationDropmenuRoot>
			<Dropmenu.Root>
				<Dropmenu.Trigger asChild>
					<HamburgerButton type="button" aria-label={label}>
						<List size={24} />
					</HamburgerButton>
				</Dropmenu.Trigger>
				<Dropmenu.Content align={align} sideOffset={8}>
					{items.map(item => (
						<Dropmenu.Item key={item.href} asChild>
							<MenuLink
								href={item.href}
								aria-current={item.isActive ? 'page' : undefined}
								data-separated={item.separated ? '' : undefined}
							>
								{item.label}
							</MenuLink>
						</Dropmenu.Item>
					))}
				</Dropmenu.Content>
			</Dropmenu.Root>
		</NavigationDropmenuRoot>
	);
}
