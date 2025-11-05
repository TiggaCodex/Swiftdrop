// Utility to generate unique tracking IDs like SD-93842
export function generateTrackingId() {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `SD-${randomNum}`;
}
export default generateTrackingId