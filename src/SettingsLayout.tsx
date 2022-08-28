import type { HolyPage } from './App';
import { MenuTab, navStyles } from './MainLayout';
import resolveRoute from './resolveRoute';
import styles from './styles/Settings.module.scss';
import {
	Brush,
	BrushOutlined,
	DriveFileRenameOutline,
	DriveFileRenameOutlineOutlined,
	Public,
} from '@mui/icons-material';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

const SettingsLayout: HolyPage = () => {
	return (
		<>
			<main className={styles.main}>
				<div className={clsx('menu', navStyles.fixedWide, styles.menu)}>
					<div className={clsx(navStyles.menuList, styles.menuList)}>
						<MenuTab
							route={resolveRoute('/settings/', 'search')}
							name="Search"
							iconFilled={<Public />}
						/>
						<MenuTab
							route={resolveRoute('/settings/', 'appearance')}
							name="Appearance"
							iconFilled={<Brush />}
							iconOutlined={<BrushOutlined />}
						/>
						<MenuTab
							route={resolveRoute('/settings/', 'tabcloak')}
							name="Tab Cloak"
							iconFilled={<DriveFileRenameOutline />}
							iconOutlined={<DriveFileRenameOutlineOutlined />}
						/>
					</div>
				</div>
				<Outlet />
			</main>
		</>
	);
};

export default SettingsLayout;
