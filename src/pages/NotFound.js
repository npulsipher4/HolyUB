import { ThemeLink } from '../ThemeElements';
import resolveRoute from '../resolveRoute';

export default function NotFound() {
	return (
		<main>
			<h1>The page you are looking for is not available.</h1>
			<hr />
			<p>
				If you typed in the URL yourself, please double-check the spelling.
				<br />
				If you got here from a link within our site, please{' '}
				<ThemeLink to={resolveRoute('/', 'contact')}>Contact Us</ThemeLink>.
			</p>
		</main>
	);
}
