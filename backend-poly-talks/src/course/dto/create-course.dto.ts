import {IsArray, IsNotEmpty, IsString, ValidateNested} from 'class-validator';
import {Type} from "class-transformer";
import {CreateAttachmentDto} from "./crate-attachment.dto";


export class CreateCourseDto {
    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    major: string;

    @IsArray()
    lecturers?: string[];

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateAttachmentDto)
    attachments: CreateAttachmentDto[];

}
