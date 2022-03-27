export declare class Delegator {
    protected proto: object;
    protected target: string;
    constructor(proto: object, target: string);
    /**
     * Delegate method `name`
     *
     * @param {string} name
     * @return {Delegator}
     */
    method(name: string): this;
    /**
     * Delegator accessor `name`
     *
     * @param {string} name
     * @return {Delegator}
     */
    access(name: string): this;
    /**
     * Delegator getter `name`
     *
     * @param {string} name
     * @return {Delegator}
     */
    getter(name: string): this;
    /**
     * Delegator setter `name`
     *
     * @param {string} name
     * @return {Delegator}
     */
    setter(name: string): this;
    /**
     * Delegator fluent accessor method
     *
     * @param {string} name
     * @return {Delegator}
     */
    fluent(name: string): this;
}
/**
 * @param {Object} proto
 * @param {String} target
 * @return {Delegator}
 */
export default function factory(proto: object, target: string): Delegator;
