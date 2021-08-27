import moment from "moment";
import "moment/locale/es";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import NavBar from "../ui/NavBar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helpers/messages";
import CalEvent from "./CalModal";
import CalModal from "./CalEvent";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import {
    eventClearActiveEvent,
    eventSetActive,
    eventStartLoading,
} from "../../actions/events";
import AddNewE from "../ui/AddNewE";
import DeleteEvent from "../ui/DeleteEvent";

moment.locale("es");
const localizer = momentLocalizer(moment);

const CalScreen = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const { uid } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(eventStartLoading());
    }, []);

    const [lastView, setLastView] = useState(
        localStorage.getItem("lastView") || "month"
    );

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent());
    };

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: uid === event.user._id ? "#367CF7" : "#465660",
            borderRadius: "0px",
            opacity: "0.8",
            display: "block",
            color: "white",
        };
        return {
            style,
        };
    };
    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    };
    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    };
    const onViewChange = (e) => {
        setLastView(setLastView(e));
        localStorage.setItem("lastView", e);
    };
    return (
        <div className="calendar-screen">
            <NavBar />
            <Calendar
                selectable={true}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalEvent,
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                view={lastView}
            />
            {activeEvent && <DeleteEvent />}
            <AddNewE />
            <CalModal />
        </div>
    );
};

export default CalScreen;