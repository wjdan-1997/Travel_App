
const requestPost = require('../src/client/js/pic_update')
const update_Function = requestPost.update_picture

describe('Test "update_picture()" should be a function' , () => {
    test('It should be a function', () => {
        expect(typeof update_Function).toBe("function");
    });
})