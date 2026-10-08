import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from './entity/episode.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Episode])],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}
