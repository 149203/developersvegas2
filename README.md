# Setup

`npm install`

`npm start`

# Deploy

`git push heroku master`

# Access the API

`https://NAME_OF_YOUR_HEROKU_APP.herokuapp.com/api/v1/presentations`

# Backup from production

Go to `C:\Program Files\MongoDB\Server\4.0\bin`

Enter the `mongodump_prod` command from your `.env` file.

Then go to the folder in `P:\Code\backups` and append today's date to the folder.

# Restore to development

Go to `C:\Program Files\MongoDB\Server\4.0\bin`

Enter the `mongorestore_dev` command from your `.env` file with the proper folder name.

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

Data returned from an API should be an array of "flat" objects, one level deep:

```
[{
   member_id: 1234,
   member_name: 'Mike Zetlow',
   presentation_id: 5678,
   presentation_title: 'Return flat objects for easy iteration in components',
   event_id: 90,
   event_date: '2019-09-25'
}]
```

# Commits

## VS Code

This should be as easy as opening Source Control, typing a commit message, and pressing `ctrl+enter`.

I have it configured to automatically add changed files to the commit, then to automatically push to remote once committed.
