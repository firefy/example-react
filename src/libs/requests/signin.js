/*
* Request mock
* */
export function signIn(param = {}) {
    return Promise.resolve({
        response: {
            token: 'example'
        }
    });
}