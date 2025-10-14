import { AccessTime, Place } from "@mui/icons-material";
import { format, parseISO } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router";

type Props = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
  const isHost = false,
    isGoing = false,
    isCancelled = false;
  const label = isHost ? "You are hosting" : "You are going",
    color = isHost ? "secondary" : isGoing ? "warning" : "default";

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <CardHeader
          avatar={<Avatar sx={{ height: 80, width: 80 }} />}
          title={activity.title}
          titleTypographyProps={{
            fontWeight: "bold",
            fontSize: 20,
          }}
          subheader={
            <>
              Hosted by <Link to={""}>{"profiles/bob"}</Link>
            </>
          }
        ></CardHeader>
      </Box>
      <Box display="flex" flexDirection="column" gap={2} mr={2}></Box>
      {(isHost || isGoing) && (
        <Chip label={label} color="error" sx={{ borderRadius: 2 }} />
      )}
      <Divider sx={{ mb: 3 }} />
      <CardContent>
        <Box display="flex" alignItems="center" mb={2} px={2}>
          <Box display="flex" flexGrow={0} alignItems="center">
            <AccessTime sx={{ mr: 1 }} />
            <Typography variant="body2">
              {format(parseISO(activity.date), "dd MMM yyyy h:mm a")}
            </Typography>
            <Place sx={{ ml: 3, mr: 1 }} />
            <Typography variant="body2">{activity.venue}</Typography>
          </Box>
        </Box>
        <Divider />
        <Box
          display="flex"
          gap={2}
          sx={{ backgroundColor: "grey.200", py: 3, pl: 3 }}
        >
          Attendees go here.
        </Box>
      </CardContent>

      <CardContent sx={{ pb: "2" }}>
        <Typography variant="body2">{activity.description}</Typography>
        <Button
          component={Link}
          to={`/activities/${activity.id}`}
          size="medium"
          variant="contained"
          sx={{ display: "flex", justifySelf: "self-end", borderRadius: 3 }}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}
