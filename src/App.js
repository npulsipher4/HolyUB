import { Component, createRef, lazy, Suspense } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import MainLayout from './MainLayout.js';
import ProxyLayout from './ProxyLayout.js';
import './styles/App.scss';

const GamesPopular = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/games/Popular.js')
);
const GamesFavorites = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/games/Favorites.js')
);
const GamesCategory = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/games/Category.js')
);
const GamesPlayer = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/games/Player.js')
);
const Home = lazy(() => import(/* webpackPrefetch: true */ './pages/Home.js'));
const PrivateLinks = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/PrivateLinks.js')
);
const Settings = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/Settings.js')
);
const SearchSettings = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/settings/Search.js')
);
const AppearanceSettings = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/settings/Appearance.js')
);
const TabCloakSettings = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/settings/TabCloak.js')
);
const FAQ = lazy(() => import(/* webpackPrefetch: true */ './pages/FAQ.js'));
const Contact = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/Contact.js')
);
const Privacy = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/Privacy.js')
);
const NotFound = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/NotFound.js')
);
const Proxy = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/Proxy.js')
);
const Credits = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/Credits.js')
);
const Terms = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/Terms.js')
);
const Ultraviolet = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/compat/Ultraviolet.js')
);
const Rammerhead = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/compat/Rammerhead.js')
);
const Stomp = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/compat/Stomp.js')
);
const Flash = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/compat/Flash.js')
);

function PlayerProxy(props) {
	const [searchParams] = useSearchParams();
	const id = searchParams.get('id');

	return (
		<Suspense fallback={<></>}>
			<GamesPlayer {...props} key={id} id={id} />
		</Suspense>
	);
}

function CategoryProxy(props) {
	const [searchParams] = useSearchParams();
	const id = searchParams.get('id');

	return (
		<Suspense fallback={<></>}>
			<GamesCategory {...props} key={id} id={id} />
		</Suspense>
	);
}

// https://reactrouter.com/docs/en/v6/getting-started/overview
export default class App extends Component {
	layout = createRef();
	render() {
		return (
			<Routes>
				<Route path="/" element={<MainLayout ref={this.layout} />}>
					<Route
						index
						element={
							<Suspense fallback={<></>}>
								<Home layout={this.layout} />
							</Suspense>
						}
					/>
					<Route
						path="/proxy.html"
						element={
							<Suspense fallback={<></>}>
								<Proxy layout={this.layout} />
							</Suspense>
						}
					/>
					<Route
						path="/faq.html"
						element={
							<Suspense fallback={<></>}>
								<FAQ layout={this.layout} />
							</Suspense>
						}
					/>
					<Route
						path="/contact.html"
						element={
							<Suspense fallback={<></>}>
								<Contact layout={this.layout} />
							</Suspense>
						}
					/>
					<Route
						path="/privacy.html"
						element={
							<Suspense fallback={<></>}>
								<Privacy layout={this.layout} />
							</Suspense>
						}
					/>
					<Route
						path="/privatelinks.html"
						element={
							<Suspense fallback={<></>}>
								<PrivateLinks layout={this.layout} />
							</Suspense>
						}
					/>
					<Route
						path="/terms.html"
						element={
							<Suspense fallback={<></>}>
								<Terms layout={this.layout} />
							</Suspense>
						}
					/>
					<Route
						path="/credits.html"
						element={
							<Suspense fallback={<></>}>
								<Credits layout={this.layout} />
							</Suspense>
						}
					/>
					<Route path="/games/">
						<Route
							path="popular.html"
							element={
								<Suspense fallback={<></>}>
									<GamesPopular layout={this.layout} />
								</Suspense>
							}
						/>
						<Route
							path="favorites.html"
							element={
								<Suspense fallback={<></>}>
									<GamesFavorites layout={this.layout} />
								</Suspense>
							}
						/>
						<Route
							path="player.html"
							element={<PlayerProxy layout={this.layout} />}
						/>
						<Route
							path="category.html"
							element={<CategoryProxy layout={this.layout} />}
						/>
					</Route>
					<Route
						path="/settings/"
						element={
							<Suspense fallback={<></>}>
								<Settings layout={this.layout} />
							</Suspense>
						}
					>
						<Route
							path="search.html"
							element={
								<Suspense fallback={<></>}>
									<SearchSettings layout={this.layout} />
								</Suspense>
							}
						/>
						<Route
							path="appearance.html"
							element={
								<Suspense fallback={<></>}>
									<AppearanceSettings layout={this.layout} />
								</Suspense>
							}
						/>
						<Route
							path="tabcloak.html"
							element={
								<Suspense fallback={<></>}>
									<TabCloakSettings layout={this.layout} />
								</Suspense>
							}
						/>
					</Route>
					<Route
						path="*"
						element={
							<Suspense fallback={<></>}>
								<NotFound layout={this.layout} />
							</Suspense>
						}
					/>
				</Route>
				<Route path="/compat/" element={<ProxyLayout ref={this.layout} />}>
					<Route
						path="rh.html"
						element={
							<Suspense fallback={<></>}>
								<Rammerhead layout={this.layout} />
							</Suspense>
						}
					/>
					<Route
						path="st.html"
						element={
							<Suspense fallback={<></>}>
								<Stomp layout={this.layout} />
							</Suspense>
						}
					/>
					<Route
						path="uv.html"
						element={
							<Suspense fallback={<></>}>
								<Ultraviolet layout={this.layout} />
							</Suspense>
						}
					/>
					<Route
						path="fl.html"
						element={
							<Suspense fallback={<></>}>
								<Flash layout={this.layout} />
							</Suspense>
						}
					/>
				</Route>
			</Routes>
		);
	}
}
