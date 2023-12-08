import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, SelectField, Text } from "@chakra-ui/react";
import { useState } from "react";
import { List, ListItem } from "@chakra-ui/react";
import useCalendar from "../hooks/useCalendar";
import getUserCalendar from "../hooks/useCalendarGet";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import useAuthStore from "../store/Auth";
import useShowToast from "../hooks/useShowToast";

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const { addEventToCalendar, removeEventFromCalendar } = useCalendar();
  const { Calendar } = getUserCalendar();
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast()
  console.log(Calendar);
  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    if (title) {
      if (!authUser || !authUser.uid) {
        showToast("Error", "Log in to create a calendar", "error");
        return;
      }
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title: title, // Use the 'title' variable here
        start: selected.start,
        end: selected.end,
        allDay: selected.allDay,
      });
      addEventToCalendar({
        ...selected,
        title: title, // Make sure 'title' is included in the selected object
      });
    }
    calendarApi.unselect();
  };
  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event ${selected.event.title}?`
      )
    ) {
      selected.event.remove();
      removeEventFromCalendar(selected.event.id);
      removeDelete(selected.event.id);
    }
  };

  const removeDelete = async (eventId) => {
    console.log(eventId);
    try {
      if (!eventId) {
        console.error("Event ID is undefined");
        return;
      }

      const eventRef = doc(db, "calendar", eventId);

      const userRef = doc(db, "users", authUser.uid);
      await updateDoc(userRef, {
        calendar: arrayRemove(eventId),
      });

      await deleteDoc(eventRef);
    } catch (error) {
      console.error("Error removing event from calendar:", error);
    }
  };
  return (
    <Box m={"20px"}>
      <Box
        display={{ base: "column", lg: "flex" }}
        justifyContent={"space-between"}
      >
        <Box bg={"green.500"} mr={4} flex={"1 1 20%"} p={15} borderRadius={6}>
          <Text>Events</Text>
          <List display={"flex"} flexDir={"column"} gap={4} p={2}>
            {Calendar.map((event) => (
              <ListItem bg={"whiteAlpha.500"} key={event.id}>
                <Text>
                  {event.start.toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  - {event.title}
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box overflowX={"auto"} width={"530px"}>
          <FullCalendar
            height={"75vh"}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={Calendar}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
