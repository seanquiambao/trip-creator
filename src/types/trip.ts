export type Trip = {
  id: number;
  title: string;
  date: Date;
};

export type Activity = {
  title: string;
  time: string;
  location: string;
  cost: number;
};

export type Day = {
  date: Date;
  day: number;
  activities: Activity[];
};
