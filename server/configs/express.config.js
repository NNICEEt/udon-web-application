const express = require('express');

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(express.static('uploads'));
    app.use('/users', express.static('users'));
    app.use('/products',express.static('products'));
}