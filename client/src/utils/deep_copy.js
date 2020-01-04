/*

Using the spread operator or Object.assign() only creates a "shallow copy."

A shallow copy is a bit-wise copy of an object. A new object is created that has an exact copy of the values in the original object. But if any of the fields of the object are references to other objects, just the reference addresses are copied, i.e., only the memory address is copied. Changing such reference field will be reflected in both objects.

https://www.codementor.io/@junedlanja/copy-javascript-object-right-way-ohppc777d

Turning it into a string and then parsing it creates a "deep copy."

If you do not use Dates, functions, undefined, regExp or Infinity within your object, this method works well.

https://stackoverflow.com/a/10869248

*/

export default json => {
   return JSON.parse(JSON.stringify(json))
}
