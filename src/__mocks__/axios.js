// src/__mocks__/axios.js
const handlers = {
  request: [],
  response: [],
};

const mockAxiosInstance = {
  interceptors: {
    request: {
      use: jest.fn((fulfilled, rejected) => {
        handlers.request.push({ fulfilled, rejected });
        return handlers.request.length - 1; // Return the index of the interceptor
      }),
      handlers: handlers.request,
    },
    response: {
      use: jest.fn(),
      handlers: handlers.response,
    },
  },
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
};

const mockAxios = {
  create: jest.fn(() => mockAxiosInstance),
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  defaults: {
    adapter: {},
  },
};

export default mockAxios;
