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

## Challenges
* Preventing abuse. To prevent abuse I implemented google reCaptcha V2. The result is send alongside the image to the server and checked, if it's bad then the request to upload is denied.
* Dragging and dropping. To implement drag and drop I used a ref and the native DOM event handlers ```dragenter```, ```dragleave```, ```dragover```, and ```drop```. I used ```dragenter``` and ```dragover``` to add a class to give visual feedback when the user drags over, ```dragleave``` to remove those classes, and ```drop``` to get the file and go onto the next step.
* Copying the url to the clipboard. To do this I created an input and positioned it far off the screen, then I copied the value of the input.
* Feature detection. I didn't want the user to be promted to drag and drop if their device or browser doesn't support that feature, so I added the following code:
  ```javascript
  let isDraggable = false
  
  if ('draggable' in document.createElement('span')) {
    isDraggable = true;
  }
  ```
  Then, I conditionally rendered elements and added classes based on the isDraggable variable.
