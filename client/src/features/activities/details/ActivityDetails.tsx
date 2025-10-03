import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type Props = {
  activity: Activity;
  cancelSelectedActivity: () => void;
  handleOpenForm: (id: string) => void;
};
export default function ActivityDetails({
  activity,
  cancelSelectedActivity,
  handleOpenForm,
}: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia
        component="img"
        src={`/images/categoryImages/${activity.category}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1" fontWeight="light">
          {activity.title}
        </Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => handleOpenForm(activity.id)} color="primary">
          Edit
        </Button>
        <Button onClick={cancelSelectedActivity} color="primary">
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
