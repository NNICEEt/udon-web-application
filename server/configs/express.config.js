const express = require('express');

module.exports = (app) => {

    //Connect Database
    require('./db.config');

    //Parser body
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

}