import { useEffect, useState, Fragment } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const getActivities = async () => {
      const response = await axios.get<Activity[]>(
        "https://localhost:5001/api/activities"
      );
      setActivities(response.data);
    };
    getActivities();
  }, []);

  return (
    <Fragment>
      <Typography variant="h3">Reactivities</Typography>
      <List>
        {activities.map((activity, i) => (
          <ListItem key={i}>
            <ListItemText>{activity.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Fragment>
  );
}

export default App;
