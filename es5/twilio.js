"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internalapi
 */
var events_1 = require("events");
var connection_1 = require("./twilio/connection");
exports.Connection = connection_1.default;
var device_1 = require("./twilio/device");
exports.Device = device_1.default;
var pstream_1 = require("./twilio/pstream");
exports.PStream = pstream_1.PStream;
var instance;
Object.defineProperty(device_1.default, 'instance', {
    get: function () { return instance; },
    set: function (_instance) {
        if (_instance === null) {
            instance = null;
        }
    },
});
device_1.default.destroy = function destroySingleton() {
    if (instance) {
        instance.destroy();
    }
    bindSingleton();
};
/**
 * Create a new Device instance and bind its functions to the Device static. This maintains
 * backwards compatibility for the Device singleton behavior and will be removed in the next
 * breaking release.
 */
function bindSingleton() {
    instance = new device_1.default();
    Object.getOwnPropertyNames(device_1.default.prototype)
        .concat(Object.getOwnPropertyNames(events_1.EventEmitter.prototype))
        .filter(function (prop) {
        return typeof device_1.default.prototype[prop] === 'function';
    })
        .filter(function (prop) { return prop !== 'destroy'; })
        .forEach(function (prop) {
        device_1.default[prop] = device_1.default.prototype[prop].bind(instance);
    });
}
bindSingleton();
Object.getOwnPropertyNames(instance)
    .filter(function (prop) { return typeof device_1.default.prototype[prop] !== 'function'; })
    .forEach(function (prop) {
    Object.defineProperty(device_1.default, prop, {
        get: function () {
            if (instance) {
                return instance[prop];
            }
        },
        set: function (_prop) {
            if (instance) {
                instance[prop] = _prop;
            }
        },
    });
});
//# sourceMappingURL=twilio.js.map