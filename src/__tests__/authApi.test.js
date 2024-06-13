import { login, register } from '../api/authApi';
import axiosInstance from '../api/axiosConfig';

jest.mock('../api/axiosConfig');

describe('authApi', () => {
  let consoleErrorSpy;
  let consoleLogSpy;

  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore(); // Restore console.error
    consoleLogSpy.mockRestore(); // Restore console.log
  });

  describe('login', () => {
    it('makes a POST request to /api/login and stores the token', async () => {
      const mockResponse = { data: { token: 'test-token' } };
      axiosInstance.post.mockResolvedValue(mockResponse);

      const result = await login('test@example.com', 'password');

      expect(result).toEqual(mockResponse.data);
      expect(axiosInstance.post).toHaveBeenCalledWith('/api/login', {
        email: 'test@example.com',
        password: 'password',
      });
      expect(localStorage.getItem('authToken')).toBe('test-token');
    });

    it('throws an error when the login request fails', async () => {
      const mockError = new Error('Login failed');
      axiosInstance.post.mockRejectedValue(mockError);

      await expect(login('test@example.com', 'password')).rejects.toThrow('Login failed');
      expect(localStorage.getItem('authToken')).toBeNull();
    });
  });

  describe('register', () => {
    it('makes a POST request to /api/register', async () => {
      const mockResponse = { data: { message: 'Registration successful' } };
      axiosInstance.post.mockResolvedValue(mockResponse);

      const userDetails = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password',
        phoneNumber: '123456789',
      };

      const result = await register(userDetails);

      expect(result).toEqual(mockResponse.data);
      expect(axiosInstance.post).toHaveBeenCalledWith('/api/register', userDetails);
    });

    it('throws an error when the registration request fails', async () => {
      const mockError = new Error('Registration failed');
      axiosInstance.post.mockRejectedValue(mockError);

      const userDetails = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password',
        phoneNumber: '123456789',
      };

      await expect(register(userDetails)).rejects.toThrow('Registration failed');
    });
  });
});
