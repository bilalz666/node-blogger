

/*
   This file responds to different http requests
*/


var url = require('url'),
    Posts = require('./posts'), 
    myposts;

myposts = new Posts();



/*
    This function parses a url path to a format that matches our filenames
    
    @param: (String) path - url pathl
*/
function parseFilename (path) {
    if (path === '/') {
        return path;
    }
    
    var separatorIndex = path.lastIndexOf('/'), tempFilename, filename;
    
    tempFilename = path.substring(1, separatorIndex) + '_' + path.substring(separatorIndex + 1);
    filename = tempFilename.replace(/\//g, '-');
    
    return filename;
}




/*
    This function loads/fetches a page containing a post and passes it to a response method 
    
    @param: (String) filename - name of a file containing a postHtmlContent
    @param: (Object) res - http response object
*/
function loadPage (filename, res) {
    var page = myposts.fetchPost(filename);
    
    if (!page) {
        res.writeHead(404);
        
        res.end('Page not found :(');
    }
    else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=utf-8'
        }); 
        
        res.end(page);   
    }
}



/*
   Expose our routes to the Global module object
*/
module.exports = function (req, res) {
    var path = url.parse(req.url).path, filename; 
    
    if (path === '/') {
        loadPage('index', res);
    }
    else {
        filename = parseFilename(path);
        loadPage(filename, res);
    }
};

