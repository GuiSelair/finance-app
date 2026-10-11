import { SessionContainer, SessionDetails, Welcome, SessionNavigation } from '@/styles/layouts/session.style';
import { PropsWithChildren } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { NavLink } from '@/components/NavLink';
import { NavigationDropmenu } from '@/components/NavigationDropmenu';

export const SessionLayout = ({ children }: PropsWithChildren) => {
	const { primaryPageSelected, sessionNavigationMapper: sessionNavigationMap, sessionPageSelected } = useNavigation();

	const getDayMoment = () => {
		const currentTime = new Date();

		const hourMorning = new Date();
		hourMorning.setHours(6);

		const hourAfternoon = new Date();
		hourAfternoon.setHours(12);

		const hourEvening = new Date();
		hourEvening.setHours(17);

		if (currentTime >= hourMorning && currentTime < hourAfternoon) return 'Bom dia';
		else if (currentTime >= hourAfternoon && currentTime < hourEvening) return 'Boa tarde';
		else return 'Boa noite';
	};

	const sessionMenuItems =
		sessionNavigationMap?.navigation?.map(page => ({
			href: `/${primaryPageSelected}/${page.path}`,
			label: page.name,
			isActive: sessionPageSelected === page.path,
		})) ?? [];

	return (
		<>
			<SessionContainer>
				<SessionDetails>
					<h1>{sessionNavigationMap?.title}</h1>
					{primaryPageSelected === 'home' && (
						<Welcome>
							{getDayMoment()}, <strong>Guilherme</strong>
						</Welcome>
					)}
				</SessionDetails>
				<SessionNavigation>
					{sessionMenuItems.map(item => (
						<NavLink key={item.href} href={item.href} isActive={item.isActive}>
							{item.label}
						</NavLink>
					))}
				</SessionNavigation>
				<NavigationDropmenu label="Abrir menu da seção" items={sessionMenuItems} align="end" />
			</SessionContainer>
			{children}
		</>
	);
};
