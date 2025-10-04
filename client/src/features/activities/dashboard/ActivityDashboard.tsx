import { Box, Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

type Props = {
  activities: Activity[];
  selectActivity: (id: string) => void;
  cancelSelectedActivity: () => void;
  selectedActivity?: Activity;
  editMode: boolean;
  handleOpenForm: (id: string) => void;
  handleFormClose: () => void;
  handleDelete: (id: string) => void;
};

export default function ActivityDashboard({
  activities,
  cancelSelectedActivity,
  selectedActivity,
  selectActivity,
  editMode,
  handleOpenForm,
  handleFormClose,
}: Props) {
  return (
    <>
      <Grid2 container spacing={3}>
        <Grid2 size={7}>
          <ActivityList
            activities={activities}
            selectActivity={selectActivity}
            cancelSelectedActivity={cancelSelectedActivity}
            handleOpenForm={handleOpenForm}
          />
        </Grid2>
        <Grid2 size={5}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {selectedActivity && (
              <ActivityDetails
                selectedActivity={selectedActivity}
                cancelSelectedActivity={cancelSelectedActivity}
                handleOpenForm={handleOpenForm}
              />
            )}
            {editMode && (
              <ActivityForm
                handleFormClose={handleFormClose}
                activity={selectedActivity}
              />
            )}
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}
