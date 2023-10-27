import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsFillCalendarFill } from "react-icons/bs";
import { Button } from "./ui/button";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";

const ScheduleStep = ({ onStepNext, onStepBack }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["appointment"]);

  // selectedDate param & state
  const searchDate = cookies.Date;
  const defaultDate = searchDate ? new Date(searchDate) : new Date();

  if (!searchDate) {
    defaultDate.setHours(8, 0, 0, 0);
  }

  const [selectedDate, setSelectedDate] = useState(defaultDate);

  // special request state
  const [specialRequest, setSpecialRequest] = useState(cookies.Special || "");

  // boarding situation state
  const [duration, setDuration] = useState(cookies.Duration || 1);
  const today = new Date();

  // serviceType param
  const [serviceType, setServiceType] = useState(cookies.Service || "");

  // appointments in appointments collection
  const [appointments, setAppointments] = useState([]);

  // function that fetches the appointments collection
  const getAppointments = () => {
    fetch("/api/all_orders", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAppointments(data);
      });
  };

  useEffect(() => {
    getAppointments();
  }, []);

  // timesByDay to execlude from datepicked based in appointments
  const excludeTimesByDay = {};

  appointments.forEach((appointment) => {
    const appointmentDate = new Date(appointment.Date);
    const year = appointmentDate.getFullYear();
    const month = appointmentDate.getMonth();
    const day = appointmentDate.getDate();
    const hours = appointmentDate.getHours();
    const minutes = appointmentDate.getMinutes();

    const dateKey = `${year}-${month + 1}-${day}`;

    if (!excludeTimesByDay[dateKey]) {
      excludeTimesByDay[dateKey] = [];
    }

    excludeTimesByDay[dateKey].push(new Date(year, month, day, hours, minutes));
  });

  // unique id for selected date
  const currentDateString = `${selectedDate.getFullYear()}-${
    selectedDate.getMonth() + 1
  }-${selectedDate.getDate()}`;

  const PushAndMove = () => {
    setCookie("Date", selectedDate.toISOString(), {
      path: "/",
      sameSite: "lax",
    });
    if (specialRequest.length === 0) {
      setCookie("Special", "None", {
        path: "/",
        sameSite: "lax",
      });
    } else {
      setCookie("Special", specialRequest, {
        path: "/",
        sameSite: "lax",
      });
    }
    if (cookies.Service === "Boarding") {
      setCookie("Duration", duration, {
        path: "/",
        sameSite: "lax",
      });
    } else {
      setCookie("Duration", 0, {
        path: "/",
        sameSite: "lax",
      });
    }

    onStepNext();
  };

  const PushAndBack = () => {
    setCookie("Date", selectedDate.toISOString(), {
      path: "/",
      sameSite: "lax",
    });
    if (specialRequest.length === 0) {
      setCookie("Special", "None", {
        path: "/",
        sameSite: "lax",
      });
    } else {
      setCookie("Special", specialRequest, {
        path: "/",
        sameSite: "lax",
      });
    }
    if (cookies.Service === "Boarding") {
      setCookie("Duration", duration, {
        path: "/",
        sameSite: "lax",
      });
    } else {
      setCookie("Duration", 0, {
        path: "/",
        sameSite: "lax",
      });
    }

    onStepBack();
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col px-16"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
      }}
    >
      <div className="text-secondary-foreground/50 text-sm font-medium">
        Step 3 of 3
      </div>
      <div className="text-3xl font-bold">Schedule your dog's appointment</div>
      <form
        className="h-full w-full flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          PushAndMove();
        }}
      >
        <div className="h-full  grid grid-cols-2  gap-10 mt-8 mb-4 mx-10">
          <div className="flex flex-col gap-7">
            {/** datetimepicker input */}
            <div className="flex flex-col">
              <label className="text-secondary-foreground text-sm font-semibold mb-2">
                Select Date & Time
              </label>
              <DatePicker
                showIcon
                icon={<BsFillCalendarFill className="fill-primary mt-1" />}
                className="h-10 w-2/3 pl-2 text-center  rounded-lg outline outline-2 outline-primary-foreground/50 focus:outline-2 focus:outline-primary"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                minTime={new Date().setHours(8, 0, 0, 0)}
                maxTime={new Date().setHours(18, 0, 0, 0)}
                minDate={new Date()}
                maxDate={
                  new Date(
                    today.getFullYear(),
                    today.getMonth() + 1,
                    today.getDate()
                  )
                }
                timeFormat="HH:mm"
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                excludeTimes={excludeTimesByDay[currentDateString] || []}
              />
            </div>
            {/** duration input */}
            {serviceType === "Boarding" ? (
              <div className="flex flex-col">
                <label
                  htmlFor="duration"
                  className="text-secondary-foreground text-sm font-semibold mb-2"
                >
                  Boarding duration
                </label>
                <input
                  type="number"
                  className={`w-1/2 pl-2 h-10 rounded-lg outline outline-2 outline-secondary-foreground/50 focus:outline-2 focus:outline-primary focus:shadow-lg focus:shadow-primary/10 transition-all`}
                  name="duration"
                  min={1}
                  placeholder="Boarding duration..."
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          {/** special requests input */}
          <div className="flex flex-col">
            <label
              htmlFor="special"
              className="text-secondary-foreground text-sm font-semibold mb-2"
            >
              Special Request
            </label>
            <textarea
              className={`pt-2 pl-2 rounded-lg outline outline-2 outline-secondary-foreground/50 focus:outline-2 h-40 max-h-44 focus:outline-primary focus:shadow-lg focus:shadow-primary/10 transition-all ${
                specialRequest.length > 0 ? "focus:outline-green-500" : ""
              }`}
              name="special"
              placeholder="Enter any special requests or more information you want us to know"
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-5 w-full flex items-end justify-between">
          <button type="button" className="font-semibold" onClick={PushAndBack}>
            Back
          </button>
          <Button className="self-end font-semibold">Next</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ScheduleStep;
