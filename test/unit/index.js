import assert from 'assert';
import 'should';
import delegate from "../../dist/index.js";

describe('.method(name)', function(){
	it('should delegate methods', function(){
		const obj = {};

		obj.request = {
			foo: function(bar){
				assert(this === obj.request);
				return bar;
			}
		};

		delegate(obj, 'request').method('foo');

		obj.foo('something').should.equal('something');
	})
})

describe('.getter(name)', function(){
	it('should delegate getters', function(){
		var obj = {};

		obj.request = {
			get type() {
				return 'text/html';
			}
		}

		delegate(obj, 'request').getter('type');

		obj.type.should.equal('text/html');
	})
})

describe('.setter(name)', function(){
	it('should delegate setters', function(){
		var obj = {};

		obj.request = {
			get type() {
				return this._type.toUpperCase();
			},

			set type(val) {
				this._type = val;
			}
		}

		delegate(obj, 'request').setter('type');

		obj.type = 'hey';
		obj.request.type.should.equal('HEY');
	})
})

describe('.access(name)', function(){
	it('should delegate getters and setters', function(){
		var obj = {};

		obj.request = {
			get type() {
				return this._type.toUpperCase();
			},

			set type(val) {
				this._type = val;
			}
		}

		delegate(obj, 'request').access('type');

		obj.type = 'hey';
		obj.type.should.equal('HEY');
	})
})

describe('.fluent(name)', function () {
	it('should delegate in a fluent fashion', function () {
		var obj = {
			settings: {
				env: 'development'
			}
		};

		delegate(obj, 'settings').fluent('env');

		obj.env().should.equal('development');
		obj.env('production').should.equal(obj);
		obj.settings.env.should.equal('production');
	})
})

// describe('.auto(proto, targetProto, target)', function(){
// 	it('should apply properties', function(){
// 		const obj = {
// 			settings: {
// 				env: 'development'
// 			}
// 		};
//
// 		let setAs = 0;
//
// 		Object.defineProperty(obj.settings, 'getter', {
// 			get: function(){
// 				return this.env;
// 			}
// 		});
//
// 		Object.defineProperty(obj.settings, 'setter', {
// 			set: val => setAs = val
// 		});
//
// 		Object.defineProperty(obj.settings, 'constant2', {
// 			get: () => 2,
// 			set: () => {}
// 		});
//
// 		delegate.auto(obj, obj.settings, 'settings');
//
// 		obj.env.should.equal('development');
// 		obj.getter.should.equal('development');
// 		obj.setter = 10;
// 		setAs.should.equal(10);
// 		obj.constant2 = 5;
// 		obj.constant2.should.equal(2);
// 	})
// })
