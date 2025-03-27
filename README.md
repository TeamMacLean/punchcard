# Punchcard

Punchcard is an app for storing notes, password, etc. Much like README.md files in git hub you need to write in Markdown.
There is the possibility of adding ticket and TODO functionality but this is not a priority right now.

## Install

```
npm install
```

If running a new database, initialise in the rethinkdb admin web panel with:

r.db('punchcard').tableCreate('session')
r.db('punchcard').table('session').indexCreate('expires')
