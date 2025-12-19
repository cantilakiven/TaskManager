import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { Priority, Category, Task } from '@/types/task';

interface TaskInputProps {
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onCancel?: () => void;
  editingTask?: Task;
  onUpdateTask?: (task: Task) => void;
}

export const TaskInput = ({ onAddTask, onCancel, editingTask, onUpdateTask }: TaskInputProps) => {
  const [title, setTitle] = useState(editingTask?.title || '');
  const [description, setDescription] = useState(editingTask?.description || '');
  const [priority, setPriority] = useState<Priority>(editingTask?.priority || 'medium');
  const [category, setCategory] = useState<Category>(editingTask?.category || 'personal');
  const [dueDate, setDueDate] = useState(editingTask?.dueDate || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTask && onUpdateTask) {
      onUpdateTask({
        ...editingTask,
        title: title.trim(),
        description: description.trim(),
        priority,
        category,
        dueDate: dueDate || undefined,
      });
    } else {
      onAddTask({
        title: title.trim(),
        description: description.trim(),
        completed: false,
        priority,
        category,
        dueDate: dueDate || undefined,
      });
    }

    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('personal');
    setDueDate('');
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card via-card to-accent/5 border-border/50 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {editingTask ? 'Edit Task' : 'New Task'}
          </h3>
          {onCancel && (
            <Button type="button" variant="ghost" size="icon" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Input
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-border/50 focus:border-primary transition-colors"
        />

        <Textarea
          placeholder="Description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-border/50 focus:border-primary transition-colors min-h-[80px]"
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Priority</label>
            <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
              <SelectTrigger className="border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Category</label>
            <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
              <SelectTrigger className="border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="learning">Learning</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Due Date</label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border-border/50 focus:border-primary transition-colors"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity">
            {editingTask ? 'Update Task' : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </>
            )}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};
