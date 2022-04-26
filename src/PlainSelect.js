import { Component, createRef } from 'react';

export default class PlainSelect extends Component {
	options = [];
	container = createRef();
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.value || this.props.defaultValue,
			open: false,
		};
	}
	async set_value(value) {
		await this.setState({
			value,
			open: false,
		});

		this.container.current.value = this.state.value;

		if (typeof this.props.onChange === 'function') {
			this.props.onChange({ target: this.container.current });
		}
	}
	render() {
		const { children, className, onChange, ...attributes } = this.props;

		const options = [];

		for (let child of children) {
			if (child.type === 'option') {
				options.push({
					name: child.props.children,
					value: child.props.value,
				});
			}
		}

		const list = [];

		for (let { name, value } of options) {
			const classes = ['plain-option'];

			if (value === this.state.last_select) {
				classes.push('hover');
			}

			list.push(
				<div
					className={classes.join(' ')}
					key={value}
					onClick={() => {
						this.set_value(value);
					}}
					onMouseOver={() => {
						this.setState({
							last_select: value,
						});
					}}
				>
					{name}
				</div>
			);
		}

		let active_option;

		for (let option of options) {
			if (option.value === this.state.value) {
				active_option = option;
				break;
			}
		}

		return (
			<div
				{...attributes}
				tabIndex="0"
				className={'plain-select' + (className ? ' ' + className : '')}
				data-open={Number(this.state.open)}
				ref={this.container}
				onKeyDown={event => {
					let prevent_default = true;

					switch (event.code) {
						case 'ArrowDown':
						case 'ArrowUp':
							// eslint-disable-next-line no-lone-blocks
							{
								let last_i = 0;

								for (let i = 0; i < options.length; i++) {
									const { value } = options[i];

									if (value === this.state.last_select) {
										last_i = i;
										break;
									}
								}

								let next;

								switch (event.code) {
									case 'ArrowDown':
										if (last_i === options.length - 1) {
											next = options[0];
										} else {
											next = options[last_i + 1];
										}
										break;
									case 'ArrowUp':
										if (last_i === 0) {
											next = options[options.length - 1];
										} else {
											next = options[last_i - 1];
										}
										break;
									// no default
								}

								this.setState({
									last_select: next.value,
								});

								if (!this.state.open) {
									this.set_value(next.value);
								}
							}
							break;
						case 'Enter':
							this.set_value(this.state.last_select);
							break;
						default:
							prevent_default = false;
							break;
						// no default
					}

					if (prevent_default) {
						event.preventDefault();
					}
				}}
			>
				<div
					className="toggle"
					onClick={async () => {
						this.setState({
							open: !this.state.open,
							last_select: this.state.value,
						});
						this.container.current.focus();
					}}
				>
					{active_option.name}
					<span className="material-icons">expand_more</span>
				</div>
				<div className="list">{list}</div>
			</div>
		);
	}
}