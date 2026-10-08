import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { EpisodeDto } from './dto/episode.dto';
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
    return this.episodeService.findAll();
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

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    console.log('find one uuid', uuid);
    this.configService.logMessage();
    const episode = await this.episodeService.findOne(uuid);
    if (!episode) {
      throw new NotFoundException('Episode not found');
    }
    return episode;
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    console.log('delete uuid: ', uuid);
    this.configService.logMessage();
    const episode = await this.episodeService.findOne(uuid);
    if (!episode) {
      throw new NotFoundException('Episode not found');
    }
    this.episodeService.delete(uuid);
  }

  @Post()
  create(@Body(ValidationPipe) input: EpisodeDto) {
    this.configService.logMessage();
    return this.episodeService.create(input);
  }

  @Put(':uuid')
  async update(
    @Body(ValidationPipe) input: EpisodeDto,
    @Param('uuid') uuid: string,
  ) {
    console.log('update uuid: ', uuid);
    this.configService.logMessage();
    const foundEpisode = await this.episodeService.findOne(uuid);
    if (!foundEpisode) {
      throw new NotFoundException('Episode not found');
    }
    return this.episodeService.update(uuid, input);
  }
}
