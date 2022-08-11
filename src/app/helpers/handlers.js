/**
 * global query handler responsible for pagination support (can be used in several modules where needs pagination)
 * provides getter which helps to get pagination query parameters more safe avoiding any unexpected errors (eg. undefined)
 * @example const proxy = new Proxy(req.query, Handlers.queryHandler());
 * proxy will contain offset, size and page properties, either with values or just null
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy}
 */
export default class Handler {
    static queryHandler() {
        return {
            get: (target, name) => {
                if (name === 'offset' || name === 'size') {
                    target[name] = parseInt(target[name]);
                }

                return name in target ? target[name] : null;
            }
        };
    }
}
