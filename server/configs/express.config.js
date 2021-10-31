const express = require('express');
const cookieParser = require('cookie-parser');

module.exports = (app) => {

    //Connect Database
    require('./db.config');

    //Parser body
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(cookieParser());
}