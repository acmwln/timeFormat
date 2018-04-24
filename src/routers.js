import React, { Component } from 'react';
const TimeFormat = require('./containers/App');
const pages = [
    {
        component: TimeFormat,
        // isInitialPage: true 
    }
    
];



export default class Router extends Component {
    constructor(props) {
        super(props);
        this.init({
            pages
        });
    }
}