import axios, { AxiosInstance, AxiosBasicCredentials } from 'axios';

export class Request {
  private baseURL: string;

  instance: AxiosInstance;

  constructor(baseURL: string, auth: AxiosBasicCredentials, timeout: number) {
    this.baseURL = baseURL;

    this.instance = axios.create({ baseURL, auth, timeout });

    this.instance.defaults.headers.post['Content-Type'] = 'application/json';
  }

  private getFullURL(url: string) {
    return `${this.baseURL}${url}`;
  }

  async wrapper<T>(
    url: string,
    params: { [key: string]: string } = {},
  ): Promise<T> {
    try {
      const { data } = await this.instance.get<T>(url, { params });

      return data;
    } catch (e) {
      return null;
    }
  }
}
