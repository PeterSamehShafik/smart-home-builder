import { Controller, Get } from '@nestjs/common';
import { AccessoriesService } from './accessories.service';

@Controller('accessories')
export class AccessoriesController {
  constructor(private readonly accessoriesService: AccessoriesService) {}

  @Get()
  findAll() {
    return this.accessoriesService.findAll();
  }
}
