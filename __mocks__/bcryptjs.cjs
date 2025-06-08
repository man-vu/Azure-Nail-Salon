module.exports = {
  hash: jest.fn(async (pw, salt) => `hashed-${pw}`),
  compare: jest.fn(async (pw, hashed) => hashed === `hashed-${pw}`)
};
