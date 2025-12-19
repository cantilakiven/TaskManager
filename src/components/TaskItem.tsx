import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@/types/task';
import { Pencil, Trash2, Calendar } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const priorityColors = {
  low: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20',
};

const categoryColors = {
  work: 'bg-primary/10 text-primary border-primary/20',
  personal: 'bg-accent/10 text-accent border-accent/20',
  health: 'bg-success/10 text-success border-success/20',
  learning: 'bg-warning/10 text-warning border-warning/20',
  other: 'bg-muted text-muted-foreground border-border',
};

export const TaskItem = ({ task, onToggle, onDelete, onEdit }: TaskItemProps) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <Card className={`p-4 transition-all duration-300 hover:shadow-md border-border/50 ${
      task.completed ? 'opacity-60' : 'hover:border-primary/30'
    }`}>
      <div className="flex items-start gap-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className="mt-1"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={`font-medium text-lg ${
              task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
            }`}>
              {task.title}
            </h3>
            <div className="flex gap-2 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(task)}
                className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(task.id)}
                className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {task.description && (
            <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={priorityColors[task.priority]}>
              {task.priority}
            </Badge>
            <Badge variant="outline" className={categoryColors[task.category]}>
              {task.category}
            </Badge>
            {task.dueDate && (
              <Badge variant="outline" className={`${
                isOverdue ? 'bg-destructive/10 text-destructive border-destructive/20' : 'bg-muted text-muted-foreground'
              }`}>
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
