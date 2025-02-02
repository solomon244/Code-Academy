import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Achievement {
  id: string;
  name: string;
  description: string;
  badgeUrl: string;
  points: number;
  awardedAt: string;
}

export default function AchievementsList() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch('/api/achievements');
        if (!response.ok) throw new Error('Failed to fetch achievements');
        const data = await response.json();
        setAchievements(data.map((ua: any) => ({
          ...ua.achievement,
          awardedAt: ua.awardedAt,
        })));
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return <div>Loading achievements...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {achievements.map((achievement) => (
        <TooltipProvider key={achievement.id}>
          <Tooltip>
            <TooltipTrigger>
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12">
                    <img
                      src={achievement.badgeUrl}
                      alt={achievement.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{achievement.name}</h3>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <Badge variant="secondary">{achievement.points} points</Badge>
                      <span className="text-xs text-gray-400">
                        Awarded: {new Date(achievement.awardedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>{achievement.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      {achievements.length === 0 && (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">No achievements earned yet. Keep learning to earn badges!</p>
        </div>
      )}
    </div>
  );
}