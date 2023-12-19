const fs = require('fs');
const md = require('jstransformer')(require('jstransformer-markdown-it'));

class Updates {
  static getSafeHTMLFromPostUrl(url, limit) {
    try {
      let postId = url.match(/updates\/([A-z0-9-_]+)/)[1];
      console.log(`Looking for post ID ${postId}`);
      // postId cannot traverse parent directories as it's regex-sanitised. 
      let mdContent = fs.readFileSync(`./content/updates/${postId}.md`).toString();
      // md below doesn't allow html in MD markup by default
      return md.render(mdContent.slice(0, limit || Number.MAX_SAFE_INTEGER)).body;
    } catch (e) {
      console.log('Error getting body for update ', url, e);
      return 'There was an error fetching this post.';
    }
  }

  static getUpdates() {
    try {
      let rows = fs.readFileSync('./content/updates-items.csv').toString();
      return rows.split('\n').map(r => {
        if (r && r[0] !== '#') {
          let [url, date, title] = r.split(',');
          if (url && date && title) {
            let domain = 'aimoprize.com';
            let type = 'post';
            let safeBody = '';
            if (url[0] == '/') {
              safeBody = Updates.getSafeHTMLFromPostUrl(url, 500);
            } else {
              let parsedUrl = new URL(url);
              domain = parsedUrl.hostname.replace(/^www\./, '');
              type = 'press';
            }
            if (domain.endsWith('reddit.com')) {
              type = 'reddit';
            }
            return { url, date, title, domain, type, safeBody }
          }
        }
      }).filter(r => !!r);
    } catch (e) {
      console.log(e);
      return []
    }
  }
}

// let segments = r.split(',');
// [url, date] = segments;
// let title = segments.slice(2).join(',');
// let tag = 'aimoprize.com';
// try{
//   let parsed = new URL(url);
//   tag = parsed.hostname.replace(/^www./, '');
// }catch(e){}
// let type = 'press';
// if(url[0] == '/'){
//   type = 'posts';
// }else if(url.includes('reddit.com')){
//   type = 'reddit';
// }
// return {url, type, title, tag, date}

module.exports = Updates