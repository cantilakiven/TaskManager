import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { Task } from '@/types/task';
import { toast } from 'sonner';

interface AISuggestProps {
  tasks: Task[];
  onAddSuggestedTasks: (tasks: Omit<Task, 'id' | 'createdAt'>[]) => void;
}
//hello
export const AISuggest = ({ tasks, onAddSuggestedTasks }: AISuggestProps) => {
  const [loading, setLoading] = useState(false);

  const handleSuggest = async () => {
    setLoading(true);
    
    try {
      // Mock AI suggestions for now - will be replaced with actual AI integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const suggestions: Omit<Task, 'id' | 'createdAt'>[] = [
        {
          title: 'Review weekly goals',
          description: 'Take time to review progress and adjust priorities',
          completed: false,
          priority: 'medium',
          category: 'personal',
        },
        {
          title: 'Schedule deep work session',
          description: 'Block 2 hours for focused work on high-priority tasks',
          completed: false,
          priority: 'high',
          category: 'work',
        },
        {
          title: 'Take a break',
          description: 'Step away from screen for mental refresh',
          completed: false,
          priority: 'low',
          category: 'health',
        },
      ];

      onAddSuggestedTasks(suggestions);
      toast.success('AI suggestions added to your task list!');
    } catch (error) {
      toast.error('Failed to generate suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 border-primary/20">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Schedule Assistant
          </h3>
          <p className="text-sm text-muted-foreground">
            Get smart task suggestions based on your current workload
          </p>
        </div>
        <Button
          onClick={handleSuggest}
          disabled={loading}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Thinking...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Suggest Tasks
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
