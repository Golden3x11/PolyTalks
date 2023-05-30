import { ThreadDto } from './thread.dto';
import { LecturerDto } from './lecturer.dto';
import { CourseDto } from './course.dto';

export interface SearchResultDto {
  threads: ThreadDto[],
  lecturers: LecturerDto[],
  courses: CourseDto[]
}