import { Trip, Day } from "@/types/trip";

export const TRIPS: Trip[] = [
  {
    id: 1,
    title: "San Diego Trip",
    date: new Date(11, 25, 25),
  },
  {
    id: 2,
    title: "San Diego Trip",
    date: new Date(11, 25, 25),
  },
  {
    id: 3,
    title: "San Diego Trip",
    date: new Date(11, 25, 25),
  },
  {
    id: 4,
    title: "San Diego Trip",
    date: new Date(11, 25, 25),
  },
];

export const DAYS: Day[] = [
  {
    date: new Date(11, 11, 2025),
    day: 1,
    activities: [
      {
        title: "Atlantic Beach Newport Hotel",
        time: "5 PM",
        location: "10900 Albany St.",
        cost: 100,
      },
      {
        title: "Ono Hawaiian BBQ",
        time: "8 PM",
        location: "1000 Main St.",
        cost: 100,
      },
    ],
  },
  {
    date: new Date(11, 11, 2025),
    day: 2,
    activities: [
      {
        title: "Atlantic Beach Newport Hotel",
        time: "5 PM",
        location: "10900 Albany St.",
        cost: 100,
      },
      {
        title: "Ono Hawaiian BBQ",
        time: "8 PM",
        location: "1000 Main St.",
        cost: 100,
      },
    ],
  },
  {
    date: new Date(11, 11, 2025),
    day: 3,
    activities: [
      {
        title: "Atlantic Beach Newport Hotel",
        time: "5 PM",
        location: "10900 Albany St.",
        cost: 100,
      },
      {
        title: "Ono Hawaiian BBQ",
        time: "8 PM",
        location: "1000 Main St.",
        cost: 100,
      },
    ],
  },
];
