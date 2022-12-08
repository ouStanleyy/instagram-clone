const getDate = (createdAt) => {
  const created = new Date(createdAt);
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  const month = created.getMonth();
  const date = created.getDate();

  let result = `${months[month]} ${date}`;

  return result;
};

export default getDate;
