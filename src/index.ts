export class Delegator {
    constructor(protected proto: object, protected target: string) {
    }

    /**
     * Delegate method `name`
     *
     * @param {string} name
     * @return {Delegator}
     */
    method(name: string): this {
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
    access(name: string): this {
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
    };

    /**
     * Delegator getter `name`
     *
     * @param {string} name
     * @return {Delegator}
     */
    getter(name: string): this {
        // this.getters.push(name);
        const proto = this.proto;
        const target = proto[this.target];

        Object.defineProperty(proto, name, {
            value: target[name],
            writable: false
        });

        return this;
    };

    /**
     * Delegator setter `name`
     *
     * @param {string} name
     * @return {Delegator}
     */
    setter(name: string): this {
        // this.setters.push(name);
        const proto = this.proto;
        const target = proto[this.target];

        Object.defineProperty(proto, name, {
            set(value) {
                target[name] = value;
            },
        });

        return this;
    };

    /**
     * Delegator fluent accessor method
     *
     * @param {string} name
     * @return {Delegator}
     */
    fluent(name: string): this {
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
    };
}

/**
 * @param {Object} proto
 * @param {String} target
 * @return {Delegator}
 */
export default function factory(proto: object, target: string): Delegator {
    return new Delegator(proto, target);
}
