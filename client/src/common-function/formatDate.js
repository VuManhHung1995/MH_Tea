export const changeDateToSql = (date) => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month > 0 && month < 10 ? `0${month}` : month;
  day = day > 0 && day < 10 ? `0${day}` : day;
  return `${year}-${month}-${day}`;
};
