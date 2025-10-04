import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";

type Props = {
  activities: Activity[];
  selectActivity: (id: string) => void;
  cancelSelectedActivity: () => void;
  handleOpenForm: (id: string) => void;
};
export default function ActivityList({
  activities,
  selectActivity,
  cancelSelectedActivity,
  handleOpenForm,
}: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          selectActivity={selectActivity}
          cancelSelectedActivity={cancelSelectedActivity}
          handleOpenForm={handleOpenForm}
        />
      ))}
    </Box>
  );
}
