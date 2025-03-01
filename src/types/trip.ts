export type Trip = {
  id: string;
  title: string;
  date: Date | undefined;
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
