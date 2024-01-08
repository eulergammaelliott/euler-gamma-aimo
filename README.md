# AIMO Website

## Editing the site

(Audience: Tim; website admins who need to edit the site)

The site can be edited from the Github.com website itself. 
- The page contents are all under the 'content' folder. And split up into pieces of content within a page
  - So the homepage is split up into multiple sections roughly in the order they appear on the page, home-1-title, home-2-introduction, etc.
  - You can use the search function to search for specific keywords.
- Updates (which means news links to external sites, reddit posts, and 'articles' hosted on this site) are explained below ('Updates').
- Assets (like PDFs) are under the assets folder - anything in that folder is available directly from the root of the website
  - This means if you upload a file so it exists at `/assets/file.pdf` it can be loaded directly from `https://aimoprize.com/file.pdf` - without the prefix 'assets'.
 
```
  [master]     [production]
     |              |
  (change)          |      Released to staging
     |              |
  (change)          |      Released to staging
      \             |
        \           |
          ----> (changes)  Released to production
```
  

### Writing markdown

Most files under the content folder have the extension `.md` and these files are written in markdown. Only some of markdown's syntax is supported, but you should get support for
- headings
- subheadings
- quotes
- links
- links to files (need to be added to the assets folder)
- images (need to be added to the assets folder)

Two useful resources:
- [Markdown cheat sheet](https://www.markdownguide.org/cheat-sheet/)
- [Interactive markdown editor](https://stackedit.io/)

### Writing CSVs

Some files in the content folder are .csv, for tables of things like blog posts. They'll generally have their own documentation inline, some notes. Github will render them as tables when you view them, but they'll be text when you edit them.

### Making an edit, previewing in staging
- Navigate to the .md file under the [content directory](/content) that you want to edit.
- Press the edit/✏ icon 
- Type your changes in markdown, flicking between the 'edit' and 'preview' tabs to see that your syntax is correct
  - This preview doesn't take the styling of the site into account
- Commit your changes 'directly to the master branch'\*
- The staging website should automatically update with your changes within 60 seconds
  - https://staging.aimoprize.com

\* you can use the 'pull request' feature to have someone else approve a speculative edit. It will need to be approved and merged before you see it in staging.

### Promoting an edit to production
- Select the 'Actions' tab within Github
- Run the 'Push to production' action, by pressing Run workflow, leaving the default branch of 'master'
- Production will be automatically updated to match staging within 15 minutes
  - https://aimoprize.com
 
### Updates

Updates are a bit of a special case, as it's a "blog" of updates. To give you the most control, you can manually reorder these. 

An 'update' can be:
1. A link to an external website (like the NYT), which will be labelled 'press'
2. A reddit post, which arguably is just a special case of #1 - the url will start with reddit.com, and it will be automatically embedded
3. An article/update hosted on the actual website, in which case you need to do two things:
   - Create the article
   - Add the article to the 'Updates' list

### Creating an 'Update' article

This is only relevant for #3 above. The first thing to do is to create the article itself - it will automatically get a URL, but nobody will be able to find it until you add it to the set of updates (see the next section). This means that all articles are 'drafts' until you 'publish' them by including them on the update page - hopefully that's handy for previewing articles etc! This also means you can use this feature to create 'sort-of secret pages', as only people with the exact article URL will be able to read it.

To create a new article, use the github website to create a new file under content/updates called '2023-12-25-its-christmas.md'. Note that
- The name ends .md
- The date is in the order YYYY-MM-DD
- It's all lowercase
- No special characters or symbols are in the filename, including commas - apart from hyphens

Within that new .md file, you can write your article using the markdown syntax discussed above. It probably makes sense to start with a header, then the date. It might look something like

```
### An article about AI models
25th December 2023

There are fifteen AI models allowed, here's a quote about them

> "AI models are really great"
John Smith, 2004

You can [find out more](https://example.com) on our website.
```.

As soon as you add that file and commit it (see above) it should be accessible from (eg.) https://staging.aimoprize.com/updates/2023-12-25-its-christmas
- That's /updates/(the name of the file you made earlier), minus the '.md' at the end.

You can now share that URL, and if you're happy, add it to the updates page. The URL you'll be adding to the updates page is just "/updates/2023.." - you don't include the whole staging.aimoprize.com part. 

### Adding updates to the updates page

This applies to #1, #2 and #3 types of update as listed above.

The updates page works by reading a CSV file, which is stored at /updates/updates-items.csv. Each line of that CSV file (that doesn't begin with a # - those are comments) represents an update on the page, in order.
You can reorder these lines however you like - but if you're adding a new update, you probably want it to be the first line in the .csv file that doesn't begin with a #.

Each line in the file is three things, separated by commas.
- A human-readable title for the update (which can't contain commas! But can contain spaces, apostrophes, and punctuation)
  - For press releases or reddit posts, this is likely to be the title of the article
  - For updates published on the website this is likely to be the title of the article
- The publish date (which can't contain commas!)
  - This can be in any format you like, but it's good to be consistent. You can just put 'Jan 2023' or a specific date
  - You can put nothing at all, which would look like `Title, , URL`
- The URL of the update
  - If it's a press link, this will be eg `https://newyorktimes.com/articles/123456`
  - If it's a reddit link, this will be eg `https://reddit.com/r/AIMOprize..`
  - If it's a website article, this will be eg `/updates/2023-12-25-its-christmas`

When you add this line, it should appear on the staging site as an update.

Once you're happy to publish, release it to Prod as above.

If you see an error page, here are some ideas you can use to troubleshoot
- Make sure that there are exactly two commas in each line of the updates-items.csv file
- Make sure that your website article (#3) actually exists if you visit it
- Make sure the reddit post still exists if you visit it 


## Technical details

(Audience: devs)

The site is a nodejs express application, using the pug templating engine, and markdown for admin-provided content. 

It's tested and working with node v20.2.0 - and designed to be deployable 'as-is' to heroku.

You can get it up and running locally by writing `PORT=1234` to a .env file in the root and running `npm i && npm run start`.

Express behaves a little differently (caching, non-verbose errors) when NODE_ENV is set to production, as it is in Heroku automatically. 
