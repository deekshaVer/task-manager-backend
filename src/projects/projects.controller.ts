import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  create(@Body() body: any, @Req() req) {
    return this.projectsService.create(body.name, req.user.userId);
  }

  @Get()
  findAll(@Req() req) {
    return this.projectsService.findByUser(req.user.userId);
  }
}