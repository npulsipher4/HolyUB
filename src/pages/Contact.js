import { Component } from 'react';
import { Obfuscated, ObfuscatedA } from '../obfuscate.js';
import { HU_DISCORD_URL } from '../root.js';

export default class Contact extends Component {
	/**
	 * @returns {import('react').Ref<import('../MainLayout.js').default>}
	 */
	get layout() {
		return this.props.layout;
	}
	render() {
		this.layout.current.set_page('contact');

		return (
			<main>
				<h1>Contact:</h1>
				<ul>
					<li>
						GitHub:{' '}
						<ObfuscatedA href="https://git.holy.how/holy">
							<Obfuscated>https://git.holy.how/holy</Obfuscated>
						</ObfuscatedA>
					</li>
					<li>
						Email:{' '}
						<ObfuscatedA href="mailto:support@holy.how">
							<Obfuscated>support@holy.how</Obfuscated>
						</ObfuscatedA>
					</li>
					<li>
						<Obfuscated>Discord</Obfuscated>:{' '}
						<ObfuscatedA href={HU_DISCORD_URL}>
							<Obfuscated>{HU_DISCORD_URL}</Obfuscated>
						</ObfuscatedA>
					</li>
				</ul>
			</main>
		);
	}
}
