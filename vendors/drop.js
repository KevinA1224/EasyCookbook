/* eslint-env browser */
/* global EventPublisher */

(function(context) {
  "use strict";
    
    //erstellt neue DropZone, bei der gewisse drag-and-drop Events abgefangen werden
   context.DropZone = context.DropZone || function(el, fileTypes) {
    EventPublisher.call(this);
    this.el = el;
    this.fileTypes = fileTypes;
    this.highlightClass = "dropzone-highlighted";
    this.el.addEventListener("dragover", this.onDragOver.bind(this));
    this.el.addEventListener("dragleave", this.onDragLeave.bind(this));
    this.el.addEventListener("drop", this.onDrop.bind(this));
  };

  context.DropZone.prototype = Object.create(EventPublisher.prototype);
  context.DropZone.prototype.constructor = context.DropZone;

  context.DropZone.prototype.handleFileDrop = function(file) {
    if (this.fileTypes.includes(file.type)) {
      this.notifyAll("fileDropped", file);
    }
  };
    
  context.DropZone.prototype.handleIngredientTextDrop = function(ingredientText) {
    if (this.fileTypes.includes("ingredient")) {
      this.notifyAll("ingredientDropped", ingredientText); 
      }
  };
    
  context.DropZone.prototype.onDragOver = function(event) {  
    this.el.classList.add("dragover");
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  context.DropZone.prototype.onDragLeave = function() { 
    this.el.classList.remove("dragover"); 
  };

  context.DropZone.prototype.onDrop = function(event) {
    var file = event.dataTransfer.files[0],
        ingredientText = event.dataTransfer.getData("Text");

    this.el.classList.remove(this.highlightClass);
    this.el.classList.remove("dragover");
    event.stopPropagation();
    event.preventDefault();
    if (file) {
      this.handleFileDrop(file);
    }
    else if (ingredientText) {
      this.handleIngredientTextDrop(ingredientText);    
    }  
  };

  context.DropZone.prototype.show = function() {
    this.el.classList.remove("hidden");
  };

  context.DropZone.prototype.hide = function() {
    this.el.classList.add("hidden");
  };

}(window));