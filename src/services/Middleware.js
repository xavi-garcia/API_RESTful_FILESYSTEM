const express = require("express");

const admin = true;
const validateUser = (req, res, next) => {
  if (admin) {
    next();
  } else {
    res.send({
      status: "error",
      error: `route /products${req.url} method ${req.method} no auhorized`,
    });
  }
};

module.exports = validateUser;