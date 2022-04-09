import root from '../root.js';
import obfuscate from '../obfuscate.js';
import { Component, createRef } from 'react';
import { ReactComponent as SearchSVG } from '../Assets/nav-search.svg';
import { Link } from 'react-router-dom';
import { qna } from '../support.js';

export default class Support extends Component {
	main = createRef();
	input = createRef();
	state = {
		search: '',
	};
	on_input(event) {
		this.setState({
			search: event.target.value,
		});
	}
	children_text(node) {
		const children = node.props.children;

		if (typeof children === 'string') {
			return children;
		} else if (Array.isArray(children)) {
			let text = '';

			for (let child of children) {
				if (typeof child === 'string') {
					text += child;
				} else {
					text += this.children_text(child);
				}
			}

			return text;
		} else {
			return ' ';
		}
	}
	render() {
		root.dataset.page = 'support';

		const sections = [];

		for (let i = 0; i < qna.length; i++) {
			const { q, a } = qna[i];

			const visible = this.children_text(q)
				.toLowerCase()
				.includes(this.state.search.toLowerCase());
			const style = {};

			if (!visible) {
				style.display = 'none';
			}

			sections.push(
				<section key={i} style={style}>
					<h1>{q}</h1>
					<p>{a}</p>
				</section>
			);
		}

		return (
			<>
				<form className="banner" onSubmit={event => event.preventDefault()}>
					<h1>{obfuscate(<>HolyUnblocker</>)} Knowledgebase</h1>
					<div className="search">
						<span className="icon">
							<SearchSVG />
						</span>
						<input
							className="bar"
							type="text"
							placeholder="Search"
							onInput={this.on_input.bind(this)}
						></input>
					</div>
				</form>
				<main ref={this.main}>
					{sections}
					<p className="note">
						Not what you're looking for?{' '}
						<Link to="/contact.html">Contact Us</Link>.
					</p>
				</main>
			</>
		);
	}
}
