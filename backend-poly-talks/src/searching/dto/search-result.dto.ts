import { Thread } from '../../thread/entities/thread.entity';
import { Lecturer } from '../../lecturer/entities/lecturer.entity';
import { Course } from '../../course/entities/course.entity';

export interface SearchResultDto {
  threads: Thread[];
  lecturers: Lecturer[];
  courses: Course[];
}