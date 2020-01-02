export default (arr, old_index, new_index) => {
   // https://stackoverflow.com/a/5306832
   if (new_index >= arr.length) {
      let k = new_index - arr.length + 1
      while (k--) {
         arr.push(undefined)
      }
   }
   arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
}
