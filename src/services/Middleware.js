const express = require("express");

const admin = true;
const validateUser = (req, res, next) => {
  if (admin) {
    next();
  } else {
    res.send({status: 'error',error: 'error'});
  }
};

module.exports = validateUser;