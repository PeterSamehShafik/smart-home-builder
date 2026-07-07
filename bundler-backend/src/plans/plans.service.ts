import { Injectable } from '@nestjs/common';
import plans from '../data/plans.json';

@Injectable()
export class PlansService {
  findAll() {
    return plans;
  }
}
