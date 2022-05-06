/**
 * @typedef {bool|string|Serializable{}|object.<string, Serializable>|undefined} Serializable
 */
export default class Settings {
	/**
	 *
	 * @param {string} key
	 * @param {object.<string, Serializable>} default_settings
	 * @param {import('react').Component} component
	 */
	constructor(key, default_settings, component) {
		this.key = key;
		this.default_settings = default_settings;
		this.load();
		if (component !== undefined) {
			this.component = component;
		}
	}
	load() {
		if (localStorage[this.key] === undefined) {
			localStorage[this.key] = '{}';
		}

		let parsed;

		try {
			parsed = JSON.parse(localStorage[this.key]);
		} catch (error) {
			parsed = {};
		}

		const settings = {};
		Reflect.setPrototypeOf(settings, null);

		let update = false;

		for (let key in this.default_settings) {
			if (this.valid_value(key, parsed[key])) {
				settings[key] = parsed[key];
			} else {
				settings[key] = this.default_settings[key];
				update = true;
			}
		}

		this.value = settings;

		if (update) {
			localStorage[this.key] = JSON.stringify(this.value);
		}
	}
	valid_value(key, value) {
		return typeof value === typeof this.default_settings[key];
	}
	get(key) {
		return this.value[key];
	}
	set_object(object) {
		let updated = false;

		for (let key in object) {
			if (this.valid_value(key, object[key])) {
				this.value[key] = object[key];
				updated = true;
			}
		}

		if (updated) {
			localStorage[this.key] = JSON.stringify(this.value);

			if (this.component !== undefined) {
				this.component.forceUpdate();
			}
		}

		return updated;
	}
	set(key, value) {
		if (typeof key === 'object') {
			this.set_object(key);
			return;
		}

		if (this.valid_value(key, value)) {
			this.value[key] = value;
			localStorage[this.key] = JSON.stringify(this.value);
			if (this.component !== undefined) {
				this.component.forceUpdate();
			}
			return true;
		} else {
			return false;
		}
	}
}
