import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './projects.schema';
@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<Project>
  ) {}

  async create(name: string, userId: string) {
    return this.projectModel.create({ name, userId });
  }

  async findByUser(userId: string) {
    return this.projectModel.find({ userId });
  }
}