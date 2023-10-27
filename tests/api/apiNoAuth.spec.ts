import { test, expect, chromium} from '@playwright/test';
import { BasePage } from '../../pom/BasePage';
import { stringify } from 'querystring';

test('Api Get Request Test ', async ({request}) => {

    const response = await request.get('http://jsonplaceholder.typicode.com/posts',{})
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    const desiredAtribute = await responseBody[0].title;
    console.log(desiredAtribute);
    expect(desiredAtribute).toContain('sunt aut facere');
    let atributeValue:number = await responseBody[1].id;
    let expectedNumber:number = 2;
    expect(atributeValue).toBe(expectedNumber);

});