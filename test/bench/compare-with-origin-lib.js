import b from 'benny';
import { expect } from 'chai';
import oldDelegate from 'delegates';
import delegate from "../../dist/index.js";

const benchConfig = {
	minDisplayPrecision: 0,
	delay: 0,
	initCount: 1,
	maxTime: 10,
	minSamples: 30
};

const iterations = 1000;

/**
 * @param {string} title
 * @param {function} suiteFn
 */
const suite = (title, suiteFn) => {
	b.suite(
		title,
		...suiteFn(),
		b.cycle(),
		b.complete(),
		b.save({ file: title, folder: 'report/origin', details: true, format: 'chart.html' }),
		b.save({ file: title, folder: 'report/origin', details: true, format: 'table.html' }),
		b.save({ file: title, folder: 'report/origin', details: true, format: 'json' }),
	);
}

/**
 * @param {string} testName
 * @param {Array} cases
 * @return {Promise[]}
 */
const dataProvider = (testName, cases) => {
	return cases.map(([name, injects]) => {
		let test = tests[testName]
		return b.add(name, test.bind(undefined, ...injects), benchConfig)
	})
}

let tests = {
	'delegate method': (delegate) => {
		const obj = {
			request: {
				foo: (bar) => bar
			}
		}

		delegate(obj, 'request').method('foo')
		expect(obj.foo('something')).to.be.eq('something')

		for (let i = 0; i < iterations; i++) {
			obj.foo('something')
		}
	},
	'delegate getter': (delegate) => {
		const obj = {
			request: {
				get type() {
					return 'text/html';
				}
			}
		};

		delegate(obj, 'request').getter('type');
		for (let i = 0; i < iterations; i++) {
			expect(obj.type).to.be.eq('text/html');
		}
	},
	'delegate setter': (delegate) => {
		const obj = {
			request: {
				get type() {
					return this._type.toUpperCase()
				},
				set type(val) {
					this._type = val
				}
			}
		}

		delegate(obj, 'request').setter('type')
		obj.type = 'hey'
		expect(obj.request.type).to.be.eq('HEY')

		for (let i = 0; i < iterations; i++) {
			obj.type = 'hey'
		}
	},
	'delegate fluent method': (delegate) => {
		const obj = {
			settings: {
				env: 'development'
			}
		};

		delegate(obj, 'settings').fluent('env');

		for (let i = 0; i < iterations; i++) {
			obj.settings.env = 'development';
			expect(obj.env()).to.be.eq('development');
			expect(obj.env('production')).to.be.equal(obj);
			expect(obj.settings.env).to.be.eq('production');
		}
	},
	'delegate access': (delegate) => {
		var obj = {
			request: {
				get type() {
					return this._type.toUpperCase();
				},

				set type(val) {
					this._type = val;
				}
			}
		};

		delegate(obj, 'request').access('type');

		for (let i = 0; i < iterations; i++) {
			obj.type = 'hey';
			expect(obj.type).to.be.eq('HEY');
		}
	},
}

suite('delegate method', () =>
	dataProvider('delegate method', [
		['modern', [delegate]],
		['origin', [oldDelegate]],
	])
)

suite('delegate getter', () =>
	dataProvider('delegate getter', [
		['modern', [delegate]],
		['origin', [oldDelegate]],
	])
)

suite('delegate setter', () =>
	dataProvider('delegate setter', [
		['modern', [delegate]],
		['origin', [oldDelegate]],
	])
)

suite('delegate fluent method', () =>
	dataProvider('delegate fluent method', [
		['modern', [delegate]],
		['origin', [oldDelegate]],
	])
)

suite('delegate access', () =>
	dataProvider('delegate access', [
		['modern', [delegate]],
		['origin', [oldDelegate]],
	])
)
