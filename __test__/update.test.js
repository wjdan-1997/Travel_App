
const requestPost = require('../src/client/js/pic_update')
const updateUIFunction = requestPost.update_picture

describe('Test "update_picture()" should be a function' , () => {
    test('It should be a function', () => {
        expect(typeof updateUIFunction).toBe("function");
    });
})