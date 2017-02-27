"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
require("mocha");
var chai = require("chai");
var getenv = require("getenv");
var expect = chai.expect;
var _1 = require("../../");
var _2 = require("../../");
var tweek_rest_1 = require("../../../tweek-rest");
var TWEEK_LOCAL_API = getenv.string('TWEEK_LOCAL_API', 'http://127.0.0.1:1111');
describe('tweek repo behavior test', function () {
    var _tweekRepo;
    var _tweekClient;
    function initTweekRepository(context) {
        if (context === void 0) { context = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var store;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _tweekClient = tweek_rest_1.createTweekClient(TWEEK_LOCAL_API + '/configurations/', {}, function (url) { return fetch(url).then(function (r) { return r.json(); }); });
                        store = new _2.MemoryStore();
                        _tweekRepo = new _1.default({ client: _tweekClient, store: store });
                        _tweekRepo.context = context;
                        return [4 /*yield*/, _tweekRepo.init()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    ;
    var testDefenitions = [];
    testDefenitions.push({
        context: {},
        pathsToPrepare: [
            '@tweek_clients_tests/test_category/test_key1'
        ],
        expectedKeys: [
            { keyName: '@tweek_clients_tests/test_category/test_key1', value: 'def value' },
        ]
    });
    testDefenitions.push({
        context: {},
        pathsToPrepare: [
            '@tweek_clients_tests/test_category/test_key1',
            '@tweek_clients_tests/test_category/test_key2',
            '@tweek_clients_tests/test_category2/user_fruit'
        ],
        expectedKeys: [
            { keyName: '@tweek_clients_tests/test_category/test_key1', value: 'def value' },
            { keyName: '@tweek_clients_tests/test_category/test_key2', value: false },
            { keyName: '@tweek_clients_tests/test_category2/user_fruit', value: 'apple' },
        ]
    });
    testDefenitions.push({
        context: {
            device: {
                'DeviceOsType': 'Ios',
                'PartnerBrandId': 'testPartner',
                'DeviceType': 'Desktop'
            }
        },
        pathsToPrepare: [
            '@tweek_clients_tests/test_category/test_key1',
            '@tweek_clients_tests/test_category/test_key2',
            '@tweek_clients_tests/test_category2/user_fruit'
        ],
        expectedKeys: [
            { keyName: '@tweek_clients_tests/test_category/test_key1', value: 'ios value' },
            { keyName: '@tweek_clients_tests/test_category/test_key2', value: true },
            { keyName: '@tweek_clients_tests/test_category2/user_fruit', value: 'orange' },
        ]
    });
    testDefenitions.push({
        context: {
            device: {
                'DeviceOsType': 'Ios',
                'PartnerBrandId': 'testPartner',
                'DeviceType': 'Desktop'
            }
        },
        pathsToPrepare: ['@tweek_clients_tests/test_category/_', '@tweek_clients_tests/test_category2/_'],
        expectedKeys: [
            { keyName: '@tweek_clients_tests/test_category/test_key1', value: 'ios value' },
            { keyName: '@tweek_clients_tests/test_category/test_key2', value: true },
            { keyName: '@tweek_clients_tests/test_category2/user_fruit', value: 'orange' },
        ]
    });
    testDefenitions.push({
        context: {
            device: {
                'DeviceType': 'Desktop'
            }
        },
        pathsToPrepare: ['@tweek_clients_tests/_'],
        expectedKeys: [
            { keyName: '@tweek_clients_tests/test_category/test_key1', value: 'def value' },
            { keyName: '@tweek_clients_tests/test_category/test_key2', value: false },
            { keyName: '@tweek_clients_tests/test_category2/user_fruit', value: 'orange' }
        ]
    });
    testDefenitions.forEach(function (test) {
        return it('should succeed get keys values', function () { return __awaiter(_this, void 0, void 0, function () {
            var getKeysValuesPromises;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Arrange
                    return [4 /*yield*/, initTweekRepository(test.context)];
                    case 1:
                        // Arrange
                        _a.sent();
                        test.pathsToPrepare.forEach(function (x) { return _tweekRepo.prepare(x); });
                        getKeysValuesPromises = [];
                        // Act
                        return [4 /*yield*/, _tweekRepo.refresh()];
                    case 2:
                        // Act
                        _a.sent();
                        // Assert
                        test.expectedKeys.forEach(function (x) {
                            getKeysValuesPromises.push(_tweekRepo.get(x.keyName));
                        });
                        return [4 /*yield*/, Promise.all(getKeysValuesPromises)
                                .then(function (values) {
                                values.forEach(function (x, index) {
                                    return expect(x.value).to.eql(test.expectedKeys[index].value, 'should have correct value');
                                });
                            })
                                .catch(function () { throw 'failed getting keys'; })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=index.spec.js.map