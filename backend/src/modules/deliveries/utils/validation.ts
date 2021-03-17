export default function (value: string, helpers: any) {
  switch (value) {
    case "Waiting":
      return value;
      break;
    case "Pickup":
      return value;
      break;
    case "Delivered":
      return value;
      break;
    default:
      return helpers.error("State not allowed");
      break;
  }

  return helpers.error("State not allowed");
}
