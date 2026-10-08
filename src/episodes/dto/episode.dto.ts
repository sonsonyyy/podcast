import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class EpisodeDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  isFeatured: boolean;

  @IsDate()
  @Type(() => Date)
  publishedAt: Date;
}
