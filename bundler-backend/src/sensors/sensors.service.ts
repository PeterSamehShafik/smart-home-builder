import { Injectable } from '@nestjs/common';
import sensors from '../data/sensors.json';

@Injectable()
export class SensorsService {
  findAll() {
    return sensors;
  }
}
