import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const ScheduleStep = (props) => {
  return (
    <div>
      <TimePicker label="Pick Suitable Time" className="bg-card rounded-xl" />
    </div>
  );
};

export default ScheduleStep;
