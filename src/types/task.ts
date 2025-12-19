export type Priority = 'low' | 'medium' | 'high';

export type Category = 'work' | 'personal' | 'health' | 'learning' | 'other';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate?: string;
  createdAt: string;
}
