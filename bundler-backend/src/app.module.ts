import { Module } from '@nestjs/common';
import { AccessoriesModule } from './accessories/accessories.module';
import { CamerasModule } from './cameras/cameras.module';
import { PlansModule } from './plans/plans.module';
import { SensorsModule } from './sensors/sensors.module';

@Module({
  imports: [AccessoriesModule, CamerasModule, PlansModule, SensorsModule],
})
export class AppModule {}
