import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SearchParamsDto {
  @IsNotEmpty()
  @IsString()
  query: string;

  @IsNotEmpty()
  @IsBoolean()
  lecturers: string;

  @IsNotEmpty()
  @IsBoolean()
  courses: string;

  @IsNotEmpty()
  @IsBoolean()
  threads: string;

  @IsNotEmpty()
  @IsBoolean()
  searchByTags: string;
}