import axios from "axios";
import {
  GET_ERRORS,
  GET_EVENTS,
  EVENTS_LOADING,
  ATTENDEE_LOADING,
  STAGE_ATTENDEE,
  STAGE_ATTENDEES,
  UNSTAGE_ATTENDEE,
  UNSTAGE_ATTENDEES,
  ATTENDEE_NOT_FOUND,
  CLEAR_ERRORS
} from "./types";
import isEmpty from "../validation/is-empty";

//Get Events
export const getEvents = () => dispatch => {
  dispatch(setEventLoading());
  axios
    .get("/calendar-app/api/event/all")
    .then(res => {
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add Event
export const addEvent = (event, history, cb) => dispatch => {
  axios
    .post("/calendar-app/api/event", event)
    .then(res => cb && cb())
    .then(res => history.push("/calendar-app"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete Event
export const deleteEvent = (id, history) => dispatch => {
  axios
    .delete(`/calendar-app/api/event/${id}/delete`)
    .then(res => history.push("/calendar-app"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Stage attendee
export const stageAttendee = attendee => dispatch => {
  dispatch(clearErrors());
  dispatch(setAttendeeLoading());
  if (isEmpty(attendee)) {
    dispatch({
      type: GET_ERRORS,
      payload: { attendees: "Please enter an attendee" }
    });
    dispatch({
      type: ATTENDEE_NOT_FOUND
    });
    return;
  }
  axios
    .get(`/calendar-app/api/event/attendee/${attendee}`)
    .then(res =>
      dispatch({
        type: STAGE_ATTENDEE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch({
        type: ATTENDEE_NOT_FOUND
      });
    });
};

//Stage multiple attendees
export const stageAttendees = attendees => dispatch => {
  dispatch(setAttendeeLoading());
  dispatch({
    type: STAGE_ATTENDEES,
    payload: attendees
  });
};

//Unstage attendee
export const unstageAttendee = attendee => dispatch => {
  dispatch({
    type: UNSTAGE_ATTENDEE,
    payload: attendee
  });
};

//Unstage multiple attendees
export const unstageAttendees = () => dispatch => {
  dispatch({
    type: UNSTAGE_ATTENDEES
  });
};

export const removeAttendee = (id, attendee, history) => async dispatch => {
  try {
    await axios.delete(
      `/calendar-app/api/event/${id}/attendee/${attendee}/delete`
    );
    history.push("/calendar-app");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

//set loading to true, display spinner
export const setEventLoading = () => {
  return {
    type: EVENTS_LOADING
  };
};

//set attendeee loading to true, display spinner button
export const setAttendeeLoading = () => {
  return {
    type: ATTENDEE_LOADING
  };
};

//Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};