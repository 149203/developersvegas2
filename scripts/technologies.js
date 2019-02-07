// GOAL: Developers select "technologies" that they used in the project they show at Demo Day from an autocomplete dropdown UI.

// KEY OBJECTIVE 1: From sources on the web, create a CSV file of all "technologies."
// KEY OBJECTIVE 2: Each file has no duplicated strings within it.
// KEY OBJECTIVE 3: Each source is its own CSV, named after the full URL, replacing all non-alphanumeric characters with an underscore.

// Sources 1-10: Columns in Wikipedia tables
// The technology must have its own internal wikipedia article link. Remove parentheticals. Remove any unlinked explanatory text. Remove stuff after ' – '.

// first column. https://en.wikipedia.org/wiki/Comparison_of_programming_languages#General_comparison
// First col of https://en.wikipedia.org/wiki/Comparison_of_programming_languages_(object-oriented_programming)#Object_construction_and_destruction
// First and 4th cols: https://en.wikipedia.org/wiki/System_programming_language#Major_languages
// First col here: https://en.wikipedia.org/wiki/Comparison_of_programming_languages_(syntax)#Statements
// Second col of each table: https://en.wikipedia.org/wiki/Timeline_of_programming_languages
// First col of each table: https://en.wikipedia.org/wiki/Comparison_of_web_frameworks
// First col: https://en.wikipedia.org/wiki/List_of_rich_Internet_application_frameworks
// First col of every table here: https://en.wikipedia.org/wiki/List_of_content_management_systems#Free_and_open_source_software
// Second col of this table: https://en.wikipedia.org/wiki/Comparison_of_single-board_computers#General_comparison
// 3rd and 4th cols. https://en.wikipedia.org/wiki/Programming_languages_used_in_most_popular_websites

// Sources 11-24: Bulleted items in Wikipedia articles
// The technology must have its own internal wikipedia article link. Remove parentheticals. Remove any unlinked explanatory text. Remove stuff after ' – '.

// Bulleted items on: https://en.wikipedia.org/wiki/General-purpose_programming_language
// Every bullet item from Array Languages up to System Languages. Wiki-linked only: https://en.wikipedia.org/wiki/List_of_programming_languages_by_type
// All bulleted items in this section: https://en.wikipedia.org/wiki/Fourth-generation_programming_language#Examples
// All bulleted items in this section: https://en.wikipedia.org/wiki/Comparison_of_programming_languages_(syntax)#Line_continuation
// All bulleted items here, except "High-level programming language": https://en.wikipedia.org/wiki/Category:High-level_programming_languages#Pages_in_category
// All bulleted items, expect the first four: https://en.wikipedia.org/wiki/Category:Web_frameworks#Pages_in_category
// All bulleted items: https://en.wikipedia.org/wiki/Category:JavaScript_web_frameworks
// All bulleted items: https://en.wikipedia.org/wiki/Category:PHP_frameworks#Pages_in_category
// All bulleted items except the first one: https://en.wikipedia.org/wiki/Category:Python_web_frameworks#Pages_in_category
// All bulleted items: https://en.wikipedia.org/wiki/Category:Rich_Internet_application_frameworks
// Bulleted items in this section: https://en.wikipedia.org/wiki/Open-source_computing_hardware#Partially_open-source_hardware
// Bulleted items in this section: https://en.wikipedia.org/wiki/Open-source_computing_hardware#Fully_open-source_hardware
// Bulleted items in this section: https://en.wikipedia.org/wiki/List_of_open-source_hardware_projects#Electronics
// Bulleted items until "See also": https://en.wikipedia.org/wiki/List_of_JavaScript_libraries

// Sources 25-32: Other

// All languages here, parsed for colons, commas, and parentheticals: https://www.tiobe.com/tiobe-index/programming-languages-definition/#instances
// All the wiki-links that follow each dt: https://en.wikipedia.org/wiki/Solution_stack#Examples
// Every technology listed in each chart in this section: https://insights.stackoverflow.com/survey/2018/#most-popular-technologies
// Every technology listed in each chart and tab in this section: https://insights.stackoverflow.com/survey/2018/#most-loved-dreaded-and-wanted
// Every language in the first table on https://www.tiobe.com/tiobe-index/
// Every language in the second table on https://www.tiobe.com/tiobe-index/
// Every language If in the third section (50-100) on https://www.tiobe.com/tiobe-index/
// All hyperlinks in first column: https://sitecake.com/resources/css-frameworks.html

/////////////////////// IDEAS ///////////////////////

// Put all technologies into their own gist (CSV file) - allow for open source pull requests
// Put all technologies and popularity into their own gist (CSV file), describe method for calculating popularity - allow for open source pull requests

// List of sites to scrape data from
// For wikipedia articles, take internal wiki-links only. Remove parentheticals. Remove any unlinked explanatory text. Remove stuff after ' – '.

// Popularity += 20
// If in the third section (50-100) on https://www.tiobe.com/tiobe-index/

// Popularity += 40
// If in the second table on https://www.tiobe.com/tiobe-index/

// Popularity += 50
// If in the first table on https://www.tiobe.com/tiobe-index/

// Popularity += 75
// Every chart and tab under: https://insights.stackoverflow.com/survey/2018/#most-loved-dreaded-and-wanted

// Popularity += 200
// Every chart under "Most Popular Technologies": https://insights.stackoverflow.com/survey/2018/#most-popular-technologies

// List of All Programming Languages and Technologies — Only make this once, then open source it and allow pull requests.
// Alphabetize and visually prune it
