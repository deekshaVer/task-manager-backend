import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt')) // 🔐 protect all routes
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // Create
  @Post()
  create(@Body() body: any, @Req() req) {
    return this.tasksService.create(
      body.title,
      req.user.userId,
      body.dueDate,
      body.priority, // ✅ add this
      body.projectId, // ✅ add this
    );
  }

  // Get all
  @Get()
  findAll(@Req() req) {
    return this.tasksService.findByUser(req.user.userId);
  }

  // Reorder (must come before :id route)
  @Patch('reorder')
  async reorderTasks(@Body() tasks: { id: string; order: number }[]) {
    return this.tasksService.reorderTasks(tasks);
  }

  // Update
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.tasksService.update(id, body);
  }

  // Delete
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
