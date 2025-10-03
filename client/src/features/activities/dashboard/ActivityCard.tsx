import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

type Props = {
  activity: Activity;
  selectActivity: (id: string) => void;
  handleOpenForm: (id: string) => void;
  cancelSelectedActivity: () => void;
  handleDelete: (id: string) => void;
};

export default function ActivityCard({
  activity,
  selectActivity,
  handleDelete,
}: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography sx={{ color: "text.secondary", mb: 1 }}>{}</Typography>
        <Typography variant="body2">{activity.description}</Typography>
        <Typography variant="subtitle1">{activity.city}</Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", pb: "2" }}
      >
        <Chip label={activity.category} variant="outlined" />
        <Box display="flex" gap={1}>
          <Button
            onClick={() => selectActivity(activity.id)}
            size="medium"
            variant="contained"
          >
            View
          </Button>
          <Button
            color="error"
            onClick={() => handleDelete(activity.id)}
            size="medium"
            variant="contained"
          >
            Delete Activity
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
