import dayjs from "dayjs";

import type { Appointment, AppointmentDateMap, User } from "@shared/types";
import { useUser } from "../user/hooks/useUser";

export function appointmentInPast(appointmentData: Appointment): boolean {
  const now = dayjs();
  return dayjs(appointmentData.dateTime) < now;
}

export const getAppointmentTitle = (
  appointmentData: Appointment,
  user?: User | null
): string => {
  let title: string = "";
  const past = appointmentInPast(appointmentData);

  if (past) {
    return "Apointment is in past...";
  }
  if (appointmentData?.userId) {
    console.log(appointmentData.userId, user?.id);
    if (!!user?.id && appointmentData.userId === user.id) {
      title = `${appointmentData?.userId} ${user.name}`;
    } else {
      title = `Appointment already reserved (userId: ${appointmentData?.userId})`;
    }
  } else {
    title = "Appointment is still available";
  }

  return title;
};

export function getAppointmentStyle(
  appointmentData: Appointment,
  userId: number | undefined
): [string, string, number, string] {
  const taken = !!appointmentData.userId;

  let opacity = 1;
  let textDecoration = "none";

  if (taken || appointmentInPast(appointmentData)) {
    const textColor = "black";
    const bgColor =
      !!userId && appointmentData.userId === userId ? "white" : "gray.300";

    if (appointmentInPast(appointmentData)) {
      opacity = 0.6;
      textDecoration = "line-through";
    }
    return [textColor, bgColor, opacity, textDecoration];
  }
  const textColor = "white";

  switch (appointmentData.treatmentName.toLowerCase()) {
    case "massage":
      return [textColor, "purple.700", opacity, textDecoration];
    case "scrub":
      return [textColor, "blue.700", opacity, textDecoration];
    case "facial":
      return [textColor, "green.700", opacity, textDecoration];
    default:
      return [textColor, "black", opacity, textDecoration];
  }
}

export function getAvailableAppointments(
  appointments: AppointmentDateMap,
  userId: number | null
): AppointmentDateMap {
  // clone so as not to mutate argument directly
  const filteredAppointments = { ...appointments };

  // only keep appointments that are open (or taken by the logged-in user) and are not in the past)
  Object.keys(filteredAppointments).forEach((date) => {
    const dateNum = Number(date);
    filteredAppointments[dateNum] = filteredAppointments[dateNum].filter(
      (appointment: Appointment) =>
        (!appointment.userId || appointment.userId === userId) &&
        !appointmentInPast(appointment)
    );
  });

  return filteredAppointments;
}
