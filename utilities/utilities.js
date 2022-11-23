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

// regular expression for phone validation
  const phoneRegex = new RegExp(
    `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`
  );
  // regular expression for email validation
  const emailRegex = new RegExp(".+@.+..+");

  // check if phone value fits regular expression
  const isPhoneValid = (phone) => {
    if (!phone.match(phoneRegex)) {
      return false;
    } else {
      return true;
    }
  };
// check if phone value fits regular expression
  const isEmailValid = (email) => {
    if (email.match(emailRegex)) {
      return true;
    } else {
      return false;
    }
  };

module.exports = {
  newId,
  updatedList,
  isPhoneValid,
  isEmailValid
};
