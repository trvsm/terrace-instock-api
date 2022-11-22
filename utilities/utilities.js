const { request } = require("express");
const { v4: uuidv4 } = require("uuid");

const newId = () => {
  return uuidv4();
};

const updatedList = (items, request) => {
  items.map((item) => {
    item.id === request.params.id ? { ...item, ...request.body } : item;
  });
};

module.exports = {
  newId,
  updatedList
};
