module.exports = get_chars_between = (str, start_regex, end_regex) => {
   return str.slice(start_regex.exec(str).index + 1, end_regex.exec(str).index)
}
