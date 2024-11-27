export default function areObjValuesTruthy(obj) {
  for (const value of Object.values(obj)) {
    if (!value) {
      return false;
    }
  }
  return true;
}
