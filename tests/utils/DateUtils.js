"use strict";

export const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};
