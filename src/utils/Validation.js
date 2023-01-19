export default class Validation {

 constructor() {
  this.configObject = require('@/config/validation.json');
 }

 validate(elementName, element) {
  let elements = this.configObject[elementName];
  let validation = true;
  let messages = [];

  if (!elements) return { validation: validation, messages: messages };

  elements.forEach((attr) => {
   if (attr.type == "") {
    let value = null;
    if (attr.key) value = element[attr.key];
    if (!value) {
     validation = false;
     messages.push(attr.name + " is required");
    }
   }
   if (attr.type == "String") {
    let value = "";
    if (attr.key) value = element[attr.key];
    if (value == null || value == "") {
     validation = false;
     messages.push(attr.name + " is required");
    }
   }
   if (attr.type == "Number") {
    let value = null;
    if (attr.key) value = element[attr.key];
    if (value == null || value == "" || isNaN(value)) {
     if (Number(value) !== 0) {
      validation = false;
      messages.push(attr.name + " is required and has to be a number");
     }
    }
   }
   if (attr.type == "PositiveNumber") {
    let value = null;
    if (attr.key) value = element[attr.key];
    if (value == null || value == "" || isNaN(value) || Number(value) < 1) {
     validation = false;
     messages.push(attr.name + " is required and has to be a positive number");
    }
   }
   if (attr.type == "Array") {
    let value = null;
    if (attr.key) value = element[attr.key];
    if (value == null || value == [] || value.length == 0) {
     validation = false;
     messages.push(attr.name + " is required");
    }
   }
   if (attr.type == "Object") {
    let isValid = false;
    let valueObject = {};
    if (attr.key) valueObject = element[attr.key];
    if (typeof valueObject === 'object' && valueObject !== null) {
     for (const value of Object.values(valueObject)) {
      if (value != null && value != "") {
       isValid = true;
      }
     }
     if (!isValid) {
      validation = false;
      messages.push(attr.name + " is required");
     }
    } else {
     validation = false;
     messages.push(attr.name + " is required");
    }
   }
  });
  return { validation: validation, messages: messages };
 }

}