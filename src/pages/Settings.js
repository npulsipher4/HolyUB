import {
	Brush,
	BrushOutlined,
	DriveFileRenameOutline,
	DriveFileRenameOutlineOutlined,
	Public,
} from '@mui/icons-material';
import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { MenuTab } from '../MainLayout.js';
import { resolveRoute } from '../Routes.js';
import '../styles/Settings.scss';

export default class Settings extends Component {
	componentDidMount() {
		this.props.layout.current.setState({ page: 'settings' });
	}
	render() {
		return (
			<>
				<div className="page-menu">
					<div className="menu-list">
						<MenuTab
							route={resolveRoute('/settings/', 'search')}
							name="Search & Proxy"
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
				<main>
					<Outlet />
				</main>
			</>
		);
	}
}
