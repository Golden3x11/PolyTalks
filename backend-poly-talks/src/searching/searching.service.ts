import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lecturer, LecturerDocument } from '../lecturer/entities/lecturer.entity';
import { Model } from 'mongoose';
import { Course, CourseDocument } from '../course/entities/course.entity';
import { Thread, ThreadDocument } from '../thread/entities/thread.entity';
import { Tag, TagDocument } from '../tag/entities/tag.entity';
import { SearchResultDto } from './dto/search-result.dto';
import { SearchParamsDto } from './dto/search-params.dto';

@Injectable()
export class SearchingService {
  constructor(@InjectModel(Lecturer.name) private lecturerModel: Model<LecturerDocument>,
              @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
              @InjectModel(Thread.name) private threadModel: Model<ThreadDocument>,
              @InjectModel(Tag.name) private tagModel: Model<TagDocument>
  ) {}

  async search(searchParamsDto: SearchParamsDto): Promise<SearchResultDto> {
    console.log(searchParamsDto)
    let lecturers = []
    if(searchParamsDto.lecturers === 'true'){
      lecturers = await this.lecturerModel.find({
        $or: [
          { name: this.regex(searchParamsDto.query) },
          { surname: this.regex(searchParamsDto.query) },
          { email: this.regex(searchParamsDto.query) }],
      }).exec();
    }

    let courses = []
    if (searchParamsDto.courses  === 'true') {
      courses = await this.courseModel.find({
        $or: [
          { name: this.regex(searchParamsDto.query) },
          { code: this.regex(searchParamsDto.query) },
          { major: this.regex(searchParamsDto.query) }],
      }).exec();
    }

    let threads = [];
    if(searchParamsDto.threads  === 'true' && searchParamsDto.searchByTags  === 'false'){
      threads = await this.threadModel.find({
        title: this.regex(searchParamsDto.query),
      }).exec()
    }else if(searchParamsDto.threads  === 'true'){
      const tagsRegex = [searchParamsDto.query].map(function (e) { return new RegExp(e, "i"); });

      threads = await this.threadModel.find({
        $or: [
          { title: this.regex(searchParamsDto.query) },
          { tags: {$in: tagsRegex} }]
      }).exec()
    }

    return{
      threads: threads,
      lecturers: lecturers,
      courses: courses
    }
  }

  private regex(query: string) {
    return { $regex: query, $options: 'i'}
  }
}