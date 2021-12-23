import {test as checkBoxTest} from '@playwright/test';

type cb_Option_Num = {
    optionNumber:string;
}

const fixture = checkBoxTest.extend<cb_Option_Num>({
    optionNumber :'2',
});

export const test = fixture;