import { getEventList } from "./getEventList";

export const retrieveEventData = async (id: string) => {
  const allEvents = await getEventList();
  const event = allEvents.find((event) => event.id === id);
  return event;
};
