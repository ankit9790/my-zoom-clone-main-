/**
 * Generates a random 8-character meeting ID string.
 * The ID consists of alphanumeric characters from a predefined set.
 * This ID is used to uniquely identify meetings.
 */
export const generateMeetingID = () => {
  let meetingID = "";
  const chars =
    "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  const maxPos = chars.length;

  for (let i = 0; i < 8; i++) {
    meetingID += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return meetingID;
};
