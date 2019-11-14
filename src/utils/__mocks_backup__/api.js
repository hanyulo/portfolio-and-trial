
/*
  this is just the file to demonstrate jest-manual-mock
  now, the mock-createShortUrl is implemented in test file
*/
const createShortUrl = async (bodyObj) => {
  const res = await Promise.resolve({
    data: {
      shortenUrl: 'test-shorten-url',
    },
  });
  return res;
};

export default {
  createShortUrl,
};

export {
  createShortUrl,
};
