import { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { Obfuscated } from './obfuscate.js';
import { gamesAPI } from './root.js';

/**
 *
 * @typedef {object} GamesCategoryParams
 * @property {boolean} [leastGreatest]
 * @property {string} [category]
 * @property {string} [sort]
 * @property {string} [search]
 * @property {number} [limit]
 */

/**
 *
 * @typedef {object} LimitedGame
 * @property {string} name
 * @property {string} id
 * @property {string} category
 */

/**
 *
 * @typedef {LimitedGame[]} GamesCategory
 */

export class GamesAPI {
	constructor(server) {
		this.server = server;
	}
	async game(id) {
		const outgoing = await fetch(new URL(`./games/${id}/`, gamesAPI));

		if (!outgoing.ok) {
			throw await outgoing.json();
		}

		return await outgoing.json();
	}
	async game_plays(id, token) {
		const outgoing = await fetch(
			new URL(
				`./games/${id}/plays?` +
					new URLSearchParams({
						token,
					}),
				gamesAPI
			),
			{
				method: 'PUT',
			}
		);

		if (!outgoing.ok) {
			throw await outgoing.json();
		}

		return await outgoing.json();
	}
	sort_params(params) {
		for (let param in params) {
			switch (typeof params[param]) {
				case 'undefined':
				case 'object':
					delete params[param];
					break;
				// no default
			}
		}

		return params;
	}
	/**
	 *
	 * @param {GamesCategoryParams} params
	 * @param {AbortSignal} signal
	 * @returns {GamesCategory}
	 */
	async category(params, signal) {
		const outgoing = await fetch(
			new URL(
				'./games/?' + new URLSearchParams(this.sort_params(params)),
				gamesAPI
			),
			{ signal }
		);

		if (!outgoing.ok) {
			throw await outgoing.json();
		}

		return await outgoing.json();
	}
}

export class Section extends Component {
	render() {
		const items = [];

		for (let item of this.props.items) {
			items.push(<Item key={item.id} id={item.id} name={item.name} />);
		}

		return (
			<section>
				<h1>{this.props.name}</h1>
				<div className="items">{items}</div>
			</section>
		);
	}
}

export class Item extends Component {
	state = {
		search: false,
		redirect: '',
	};
	open() {
		this.setState({
			redirect: `/games/player.html?id=${this.props.id}`,
		});
	}
	render() {
		let redirect;

		if (this.state.redirect !== '') {
			redirect = <Navigate replace to={this.state.redirect} />;
		}

		return (
			<>
				{redirect}
				<div className="item" onClick={this.open.bind(this)}>
					<img alt="thumbnail" src={`/thumbnails/${this.props.id}.webp`}></img>
					<div>
						<Obfuscated>{this.props.name}</Obfuscated>
					</div>
				</div>
			</>
		);
	}
}
