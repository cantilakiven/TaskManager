import { Card } from '@/components/ui/card';
import { Task } from '@/types/task';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';

interface TaskStatsProps {
  tasks: Task[];
}

export const TaskStats = ({ tasks }: TaskStatsProps) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && !t.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completion Rate</p>
            <p className="text-2xl font-bold text-foreground">{completionRate}%</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent/10">
            <Circle className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active Tasks</p>
            <p className="text-2xl font-bold text-foreground">{totalTasks - completedTasks}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">High Priority</p>
            <p className="text-2xl font-bold text-foreground">{highPriorityTasks}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
