module.exports = {
  sign: jest.fn(() => 'signed-token'),
  verify: jest.fn(() => ({ userId: 1 }))
};
