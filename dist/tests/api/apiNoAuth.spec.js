"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)('Api Get Request Test ', ({ request }) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get('http://jsonplaceholder.typicode.com/posts', {});
    (0, test_1.expect)(response.status()).toBe(200);
    const responseBody = yield response.json();
    const desiredAtribute = yield responseBody[0].title;
    console.log(desiredAtribute);
    (0, test_1.expect)(desiredAtribute).toContain('sunt aut facere');
    let atributeValue = yield responseBody[1].id;
    let expectedNumber = 2;
    (0, test_1.expect)(atributeValue).toBe(expectedNumber);
}));
//# sourceMappingURL=apiNoAuth.spec.js.map