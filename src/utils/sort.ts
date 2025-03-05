import { Activity } from "@/types/trip";
export const convertTo24HourFormat = (time: string) => {
  const [hour, period] = time.split(" ");
  let h = Number(hour);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0; // Handle 12 AM case
  return h * 60; // Convert to minutes for easy comparison
};

export const sortActivitiesByTime = (activities: Activity[]) => {
  return activities.sort((a, b) => {
    const timeA = convertTo24HourFormat(a.time);
    const timeB = convertTo24HourFormat(b.time);
    return timeA - timeB;
  });
};
