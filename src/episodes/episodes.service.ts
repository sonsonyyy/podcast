import { Injectable } from '@nestjs/common';
import { Episode } from './entity/episode.entity';
import { EpisodeDto } from './dto/episode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode)
    private episodeRepository: Repository<Episode>,
  ) {}

  findAll(): Promise<Episode[]> {
    return this.episodeRepository.find();
  }

  async findFeaturedEpisodes(): Promise<Episode[]> {
    return this.episodeRepository.findBy({ isFeatured: true });
  }

  async findOne(uuid: string): Promise<Episode | null> {
    return this.episodeRepository.findOneBy({ uuid });
  }

  async delete(uuid: string): Promise<void> {
    await this.episodeRepository.softDelete(uuid);
  }

  async create(episodeDto: EpisodeDto): Promise<Episode> {
    const newEpisode = await this.episodeRepository.save(episodeDto);
    return newEpisode;
  }

  async update(uuid: string, episodeDto: EpisodeDto): Promise<Episode> {
    const updatedEpisode = await this.episodeRepository.update(
      { uuid: uuid },
      episodeDto,
      { returning: '*' },
    );
    return updatedEpisode.raw[0];
  }
}
