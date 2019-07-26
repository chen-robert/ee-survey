# ee-survey

This is the repository for a web-based survey I made to collect data regarding my IB extended essay. 

## Question

To what extent are recurrent neural networks able to generate classical music indistinguishable to the human ear?

## Overview

The server runs on a NodeJS backend built on Express. Templating is done through ejs. Styles are written in LESS and compiled at runtime through a middleware.

Informal mode can be actived by appending passing in `informal` as a query parameter, for example, by appending `?informal=y` to the url. The informal mode consists of a progression based gameplay that makes the survey more interesting, inspired by idle games such as [Crank](https://faedine.com/games/crank/b39/) and [A Dark Room](http://adarkroom.doublespeakgames.com/).
