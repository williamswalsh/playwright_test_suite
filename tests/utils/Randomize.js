"use strict";
const crypto = require("crypto");

export const randomWorkEmail = () => {
  return "test.email" + Math.random().toString().substring(0, 63) + "@work.com";
};

export const randomUUIDWorkEmail = () => {
  return "test.email" + crypto.randomUUID() + "@work.com";
};

export const randomPhone = () => {
  return Math.random().toString().substring(2, 6);
};
