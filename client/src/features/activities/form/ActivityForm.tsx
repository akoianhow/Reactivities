import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { act, type FormEvent } from "react";

type Props = {
  handleFormClose: () => void;
  activity?: Activity;
  handleSubmitForm: (activity: Activity) => void;
};

export default function ActivityForm({
  handleFormClose,
  activity,
  handleSubmitForm,
}: Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    if (activity) data.id = activity.id;
    handleSubmitForm(data as unknown as Activity);
  };

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create Activity
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextField name="title" label="Title" defaultValue={activity?.title} />
        <TextField
          name="description"
          label="Description"
          defaultValue={activity?.description}
          multiline
          rows={3}
        />
        <TextField
          name="category"
          defaultValue={activity?.category}
          label="Category"
        />
        <TextField
          name="date"
          defaultValue={activity?.date}
          label="Date"
          type="date"
        />
        <TextField name="city" defaultValue={activity?.city} label="City" />
        <TextField name="venue" defaultValue={activity?.venue} label="Venue" />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button onClick={handleFormClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" color="success" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
