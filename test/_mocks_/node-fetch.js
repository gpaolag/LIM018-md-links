

const fetch = jest.fn(() => Promise.resolve({
    status: 200,
    statusText: 'Ok',
}));
module.exports = {
    fetch,
};