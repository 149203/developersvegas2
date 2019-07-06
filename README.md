# Setup

`npm install`

`npm start`

# Deploy

`git push heroku master`

# Conventions

lower_snake_case for everything except urls and filenames of web assets (like images).

Dates look like this:

`created_on`

`signed_in_on`

Booleans look like this:

`is_active`

`has_signature`

URLs look like this:

`profile_photo_orig_url`

`portfolio_url`

ObjectIDs look like this:

`member_id`

`technology_id`

Soft deletes are indicated with the `is_active` field.

Map tables follow the convention:

`presentation_technologies`

`member_badges`

Map tables do not have a row_id / primary key.

# Commits

## VS Code

This should be as easy as opening Source Control, typing a commit message, and pressing `ctrl+enter`.

I have it configured to automatically add changed files to the commit, then to automatically push to remote once committed.
