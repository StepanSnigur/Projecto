export const isJson = (item: any) => {
  item = typeof item !== "string"
    ? JSON.stringify(item)
    : item

  try {
    item = JSON.parse(item)
  } catch (err) {
    return false
  }

  if (typeof item === "object" && item !== null) {
    return true
  }

  return false;
}