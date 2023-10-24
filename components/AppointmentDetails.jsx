import { useCookies } from "react-cookie";

function AppointmentDetails() {
  const [cookies, setCookie] = useCookies(["appointment"]);

  return <div>AppointmentDetails</div>;
}

export default AppointmentDetails;
