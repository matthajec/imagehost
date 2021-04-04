# Imagehost Client

## Description
This is the front end for my image hosting service. You can upload .jpg, .jpeg, .png, and .webp files under 2MB, then you can access and share them via a URL. 

## Features
* reCaptcha
* Drag and drop
* File upload

## Built With
* React
* SASS/SCSS
* Google reCaptcha V2

## What I Learned
* How to handle files on the client, esspecially in React
* How to implement Google ReCaptcha on the client
* How to handle dragging and dropping files

## Challenges
* Preventing abuse. To prevent abuse I implemented google reCaptcha V2. The result is send alongside the image to the server and checked, if it's bad then the request to upload is denied.
* Dragging and dropping. To implement drag and drop I used a ref and the native DOM event handlers ```dragenter```, ```dragleave```, ```dragover```, and ```drop```. I used ```dragenter``` and ```dragover``` to add a class to give visual feedback when the user drags over, ```dragleave``` to remove those classes, and ```drop``` to get the file and go onto the next step.
