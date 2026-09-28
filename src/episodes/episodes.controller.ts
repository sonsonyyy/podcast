import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { ConfigService } from '../config/config.service';
import { IsPositivePipe } from '../pipes/is-positive/is-positive.pipe';
import { ApiKeyGuard } from '../guards/api-key.guard';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodeService: EpisodesService,
    private configService: ConfigService,
  ) {}

  @Get()
  findAll(
    @Query('sort') sort: 'asc' | 'desc' = 'desc',
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe)
    limit: number,
  ) {
    console.log(sort);
    this.configService.logMessage();
    return this.episodeService.findAll(sort);
  }

  @Get('featured')
  findFeaturedEpisodes() {
    this.configService.logMessage();
    return this.episodeService.findFeaturedEpisodes();
  }

  @UseGuards(ApiKeyGuard)
  @Get('awesome')
  awesome() {
    return 'NestJS is Awesome!';
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log(id);
    this.configService.logMessage();
    const episode = await this.episodeService.findOne(id);
    if (!episode) {
      throw new NotFoundException('Episode not found');
    }

    return episode;
  }

  @Post()
  create(@Body(ValidationPipe) input: CreateEpisodeDto) {
    this.configService.logMessage();
    return this.episodeService.create(input);
  }
}
