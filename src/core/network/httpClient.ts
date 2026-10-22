import axios, { type AxiosInstance } from 'axios';
import { env } from '../config/env';
import { AppError, toAppError } from '../errors/AppError';

export interface ApiEnvelope<T> {
  errno: number;
  data: T;
}

export const SUCCESS_ERRNO = 0;

export function createHttpClient(baseURL: string = env.apiBaseUrl): AxiosInstance {
  const client = axios.create({
    baseURL,
    timeout: env.requestTimeoutMs,
    headers: { Accept: 'application/json' },
  });

  client.interceptors.response.use(
    response => response,
    error => {
      if (error?.response) {
        return Promise.reject(
          new AppError('http', `HTTP ${error.response.status}`, {
            status: error.response.status,
            cause: error,
          }),
        );
      }
      return Promise.reject(AppError.network(error));
    },
  );

  return client;
}

export async function getEnvelope<T>(
  client: AxiosInstance,
  url: string,
  params?: Record<string, unknown>,
): Promise<T> {
  try {
    const { data } = await client.get<ApiEnvelope<T>>(url, { params });
    if (!data || typeof data.errno !== 'number') {
      throw AppError.parse(data);
    }
    if (data.errno !== SUCCESS_ERRNO) {
      throw AppError.business(data.errno);
    }
    return data.data;
  } catch (error) {
    throw toAppError(error);
  }
}
