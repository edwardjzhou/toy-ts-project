export module StringCleaning { 
    //  ['3,Math', 'Mrs. C', ''] mutates to ['3,Math', 'Mrs. C']
    export function removeEmptyStringsFromStringArray(array: string[]){
        for (let i = 0; i < array.length; i++) {
            let j = i;
            while (array[j] === "") j++;
            array.splice(i, j-i);
        }
    }

    // ['2,History, Mrs. P'] mutates to ['2,History,Mrs. P']
    export function removeSpacesAfterCommasFromStringArray(array: string[]){
        const arrayLength = array.length
        for (let i = 0; i < arrayLength; i++){
            let replacement = '';
            const current = array[i]
            const stringLength = current.length
            for (let j = 0; j < stringLength ; j++) {
                let right = j;
                while (current[j] === ',' && current[right+1] === ' ') right++;
                replacement += current[j];
                j = right;
            }
            array[i] = replacement;
        }
    }
}


if (process.env.NODE_ENV !== 'production') {
    const assert = require('assert');

    const emptyTest = ['3,Math', 'Mrs. C', ''];
    StringCleaning.removeEmptyStringsFromStringArray(emptyTest);
    assert.deepStrictEqual(emptyTest.filter(ele => ele === '').length, 0);

    const spacesTest = ['2,History, Mrs. P'];
    StringCleaning.removeSpacesAfterCommasFromStringArray(spacesTest)
    assert.deepStrictEqual(spacesTest, ['2,History,Mrs. P']);
}