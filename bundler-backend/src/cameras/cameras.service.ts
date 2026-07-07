import { Injectable } from '@nestjs/common';
import cameras from '../data/cameras.json';

@Injectable()
export class CamerasService {
  findAll() {
    return cameras;
  }
}
