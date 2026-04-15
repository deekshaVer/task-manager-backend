import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';
import { Types } from 'mongoose';
@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  // ✅ Create Task
  async create(
    title: string,
    userId: string,
    dueDate?: Date,
    priority?: string,
    projectId?: string,
  ) {
    // 🔥 Get last task order
    const lastTask = await this.taskModel
      .findOne({ userId })
      .sort({ order: -1 });

    const newOrder = lastTask ? lastTask.order + 1 : 0;

    // ✅ Create task with order
    return this.taskModel.create({
      title,
      userId,
      dueDate,
      priority,
      projectId,
      order: newOrder, // 🔥 IMPORTANT
    });
  }

  // ✅ Get Tasks (sorted by order)
  async findByUser(userId: string) {
    return this.taskModel.find({ userId }).sort({ order: 1 }); // 🔥 IMPORTANT
  }

  // ✅ Update Task
  async update(id: string, updateData: Partial<Task>) {
    return this.taskModel.findByIdAndUpdate(id, { $set: updateData }, {
      new: true,
    });
  }

  // ✅ Delete Task
  async delete(id: string) {
    return this.taskModel.findByIdAndDelete(id);
  }

  // ✅ Reorder Tasks
  async reorderTasks(tasks: { id: string; order: number }[]) {
    try {
      if (!Array.isArray(tasks)) {
        throw new Error('Tasks must be an array');
      }
      const bulkOps = tasks.map((task) => ({
        updateOne: {
          filter: { _id: new Types.ObjectId(task.id) },
          update: { $set: { order: task.order } },
        },
      }));

      return await this.taskModel.bulkWrite(bulkOps);
    } catch (error) {
      console.error('🔥 Reorder Error:', error);
      throw error;
    }
  }
}
