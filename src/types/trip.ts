export type Trip = {
  id: string;
  title: string;
  date: Date | undefined;
};

export type Event = {
  title: string;
  time: string;
  location: string;
  cost: number;
};

export type Day = {
  date: Date;
  day: number;
  events: Event[];
};
