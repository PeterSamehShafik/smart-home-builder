import { Injectable } from '@nestjs/common';
import accessories from '../data/accessories.json';

@Injectable()
export class AccessoriesService {
  findAll() {
    return accessories;
  }
}
