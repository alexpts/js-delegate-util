import b from 'benny';
import { expect } from 'chai';
import delegate from "../../index.js";

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
		b.save({ file: title, folder: 'report/direct', details: true, format: 'chart.html' }),
		b.save({ file: title, folder: 'report/direct', details: true, format: 'table.html' }),
		b.save({ file: title, folder: 'report/direct', details: true, format: 'json' }),
	);
}

suite('delegate method', () => {
	const obj = {
		request: {
			foo: (bar) => bar
		}
	};

	return [
		b.add('delegate', () => {
			delegate(obj, 'request').method('foo')
			expect(obj.foo('something')).to.be.eq('something')

			for (let i = 0; i < iterations; i++) {
				obj.foo('something')
			}
		}, benchConfig),

		b.add('direct', () => {
			expect(obj.request.foo('something')).to.be.eq('something')

			for (let i = 0; i < iterations; i++) {
				obj.request.foo('something')
			}
		}, benchConfig)
	];
})

suite('delegate getter', () => {
	const obj = {
		request: {
			get type() {
				return 'text/html';
			}
		}
	};

	return [
		b.add('delegate', () => {
			delegate(obj, 'request').getter('type');
			for (let i = 0; i < iterations; i++) {
				expect(obj.type).to.be.eq('text/html');
			}
		}, benchConfig),

		b.add('direct', () => {
			for (let i = 0; i < iterations; i++) {
				expect(obj.request.type).to.be.eq('text/html');
			}
		}, benchConfig)
	];
})

suite('delegate setter', () => {
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

	return [
		b.add('delegate', () => {
			delegate(obj, 'request').setter('type')
			obj.type = 'hey'
			expect(obj.request.type).to.be.eq('HEY')

			for (let i = 0; i < iterations; i++) {
				obj.type = 'hey'
			}
		}, benchConfig),

		b.add('direct', () => {
			obj.request.type = 'hey'
			expect(obj.request.type).to.be.eq('HEY')

			for (let i = 0; i < iterations; i++) {
				obj.request.type = 'hey'
			}
		}, benchConfig)
	];
})
