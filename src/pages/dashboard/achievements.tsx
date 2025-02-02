import ProtectedRoute from "@/components/ProtectedRoute";
import AchievementsList from "@/components/dashboard/AchievementsList";

export default function Achievements() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your Achievements</h1>
        <div className="mb-6">
          <p className="text-muted-foreground">
            Track your learning progress and earn badges as you master new skills.
            Complete courses and lessons to unlock new achievements!
          </p>
        </div>
        <AchievementsList />
      </div>
    </ProtectedRoute>
  );
}