import { Controller } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  async getPrice(crypto: string, currency: string) {
    this.apiService.getPrice(crypto, currency);
  }
}
