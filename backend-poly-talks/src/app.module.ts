import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './course/course.module';
import { ThreadModule } from './thread/thread.module';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { LecturerModule } from './lecturer/lecturer.module';
import { SearchingModule } from './searching/searching.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:password@localhost:27017',
    {
      dbName: 'polytalks',
    }), CourseModule, ThreadModule, UserModule, TagModule, LecturerModule, SearchingModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}

