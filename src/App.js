import { Component, createRef, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout.js';
import ProxyLayout from './ProxyLayout.js';
import GamesLayout from './GamesLayout.js';
import './styles/App.scss';

const Home = lazy(() => import(/* webpackPrefetch: true */ './pages/Home.js'));
const Games = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/games/Games.js')
);
const Category = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/games/Category.js')
);
const Support = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/Support.js')
);
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
const Licenses = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/Licenses.js')
);
const Terms = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/Terms.js')
);
const Ultraviolet = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/proxies/Ultraviolet.js')
);
const Rammerhead = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/proxies/Rammerhead.js')
);
const Stomp = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/proxies/Stomp.js')
);
const Flash = lazy(() =>
	import(/* webpackPrefetch: true */ './pages/proxies/Flash.js')
);

// https://reactrouter.com/docs/en/v6/getting-started/overview
export default class App extends Component {
	game_categories = [];
	constructor(props) {
		super(props);

		for (let category of ['social', 'platformer']) {
			this.game_categories.push(
				<Route
					key={category}
					path={`${category}.html`}
					element={
						<Suspense fallback={<></>}>
							<Category id={category} layout={this.layout} />
						</Suspense>
					}
				/>
			);
		}
	}
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
						path="/support.html"
						element={
							<Suspense fallback={<></>}>
								<Support layout={this.layout} />
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
						path="/terms.html"
						element={
							<Suspense fallback={<></>}>
								<Terms layout={this.layout} />
							</Suspense>
						}
					/>
					<Route
						path="/licenses.html"
						element={
							<Suspense fallback={<></>}>
								<Licenses layout={this.layout} />
							</Suspense>
						}
					/>
					<Route path="/games/" element={<GamesLayout layout={this.layout} />}>
						<Route
							path=""
							element={
								<Suspense fallback={<></>}>
									<Games layout={this.layout} />
								</Suspense>
							}
						/>
						{this.game_categories}
					</Route>
				</Route>
				<Route path="/proxies/" element={<ProxyLayout ref={this.layout} />}>
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
						path="flash.html"
						element={
							<Suspense fallback={<></>}>
								<Flash layout={this.layout} />
							</Suspense>
						}
					/>
				</Route>
				<Route
					path="*"
					element={
						<MainLayout
							element={
								<Suspense fallback={<></>}>
									<NotFound layout={this.layout} />
								</Suspense>
							}
						/>
					}
				/>
			</Routes>
		);
	}
}
