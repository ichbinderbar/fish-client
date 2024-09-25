export default function formatDate(isoString) {
  try {
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    return date.toISOString().replace("T", " ").split(".")[0];
  } catch (error) {
    return "Invalid date";
  }
}
