export class Delegator {
    proto;
    target;
    constructor(proto, target) {
        this.proto = proto;
        this.target = target;
    }
    /**
     * Delegate method `name`
     *
     * @param {string} name
     * @return {Delegator}
     */
    method(name) {
        const proto = this.proto;
        const target = proto[this.target];
        proto[name] = target[name].bind(target);
        return this;
    }
    /**
     * Delegator accessor `name`
     *
     * @param {string} name
     * @return {Delegator}
     */
    access(name) {
        const proto = this.proto;
        const target = proto[this.target];
        Object.defineProperty(proto, name, {
            get() {
                return target[name];
            },
            set(value) {
                target[name] = value;
            }
        });
        return this;
    }
    ;
    /**
     * Delegator getter `name`
     *
     * @param {string} name
     * @return {Delegator}
     */
    getter(name) {
        // this.getters.push(name);
        const proto = this.proto;
        const target = proto[this.target];
        Object.defineProperty(proto, name, {
            value: target[name],
            writable: false
        });
        return this;
    }
    ;
    /**
     * Delegator setter `name`
     *
     * @param {string} name
     * @return {Delegator}
     */
    setter(name) {
        // this.setters.push(name);
        const proto = this.proto;
        const target = proto[this.target];
        Object.defineProperty(proto, name, {
            set(value) {
                target[name] = value;
            },
        });
        return this;
    }
    ;
    /**
     * Delegator fluent accessor method
     *
     * @param {string} name
     * @return {Delegator}
     */
    fluent(name) {
        const proto = this.proto;
        const target = proto[this.target];
        proto[name] = function (val) {
            if ('undefined' === typeof val) {
                return target[name];
            }
            target[name] = val;
            return this;
        };
        return this;
    }
    ;
}
/**
 * @param {Object} proto
 * @param {String} target
 * @return {Delegator}
 */
export default function factory(proto, target) {
    return new Delegator(proto, target);
}
//# sourceMappingURL=index.js.map