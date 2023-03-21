export function tidyDateAndTime(date: Date) {
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const tidiedDateAndTime = `${formattedDate} (${formattedTime})`;
  return tidiedDateAndTime;
}
