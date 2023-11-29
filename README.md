# AI-MO Website

## Editing the site

(Audience: website admins who need to edit the site)

The site can be edited from the Github itself. 
- The page contents are all under the 'content' folder.
- Assets (like PDFs) are under the assets folder - anything in that folder is available directly from the root of the website
  - This means if you upload a file so it exists at `/assets/file.pdf` it can be loaded directly from `https://aimoprize.com/file.pdf` - without the prefix 'assets'.

### Writing markdown

The files under the content folder have the extension `.md` and these files are written in markdown. Only some of markdown's syntax is supported, but you should get support for
- headings
- subheadings
- quotes
- links
- links to files (need to be added to the assets folder)
- images (need to be added to the assets folder)

Two useful resources:
- [Markdown cheat sheet](https://www.markdownguide.org/cheat-sheet/)
- [Interactive markdown editor](https://stackedit.io/)

### Making an edit, previewing in staging
- Navigate to the .md file under the [content directory](/content) that you want to edit.
- Press the edit/✏ icon 
- Type your changes in markdown, flicking between the 'edit' and 'preview' tabs to see that your syntax is correct
  - This preview doesn't take the styling of the site into account
- Commit your changes 'directly to the master branch'\*
- The staging website should automatically update with your changes within 60 seconds


## Technical details

(Audience: devs)

The site is a nodejs express application, using the pug templating engine, and markdown for admin-provided content. 

It's tested and working with node v20.2.0 - and designed to be deployable 'as-is' to heroku.

You can get it up and running locally by writing `PORT=1234` to a .env file in the root and running `npm i && npm run start`.

Express behaves a little differently (caching, non-verbose errors) when NODE_ENV is set to production, as it is in Heroku automatically. 