export const submitAppointment = (formData, setData: () => void) => {
  // Create a Date object from formData.appointmentDate
  const startDateTime = new Date(formData.appointmentDate);

  // Extract the hours and minutes from formData.appointmentTime
  const [hours, minutes] = formData.appointmentTime.split(":").map(Number);

  // Set the hours and minutes of startDateTime
  startDateTime.setHours(hours, minutes);

  // Create a Date object for the end time (1 hour after the start time)
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

  const newAppointment = {
    summary: formData.title,
    location: "São Paulo - SP, Brasil",
    description: formData.description,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: "America/Sao_Paulo",
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: "America/Sao_Paulo",
    },
    attendees: [
      {
        email: formData.userAssociated,
        optional: false,
      },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        {
          method: "email",
          minutes: 24 * 60,
        },
      ],
    },
  };
  setData(newAppointment);
};
