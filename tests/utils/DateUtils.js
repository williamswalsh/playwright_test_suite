"use strict";

export const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

export const getTodaysDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  return { day: dd, month: mm, year: yyyy };
};

export const getTomorrowsDate = () => {
  let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  let dd = String(tomorrow.getDate()).padStart(2, "0");
  let mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
  let yyyy = tomorrow.getFullYear();

  return { day: dd, month: mm, year: yyyy };
};

var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();
