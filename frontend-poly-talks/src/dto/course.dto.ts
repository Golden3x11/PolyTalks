export interface CourseDto {
    _id: string;
    code: string;
    name: string;
    description: string;
    major: string;
    lecturers: string[];
    attachments: string[];
}