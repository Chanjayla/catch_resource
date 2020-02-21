const request = require('request')
const fs = require('fs')
const path = require('path')
const url = require('url')
function download(opts) {
    const dir = opts.path
    const list = opts.list
    console.log('download文件个数:',list.length)
    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    list.forEach(item => {
        let pathname = url.parse(item).pathname
        let hostname = url.parse(item).hostname
        // let match = pathname.match(/(?<=\.com)\//)
        // let subIndex = match ? match.index + 1 : null
        let subIndex = 0
        let ext = path.extname(pathname)
        if (subIndex === null) {
            return false;
        }
        let subDir = path.dirname(pathname).substring(subIndex)
        mkMultDir(path.join(dir,hostname,subDir)).then( () => {
            let dist = path.join(dir,hostname,subDir,path.basename(pathname))
            if(!fs.existsSync(dist))  {
                let stream = fs.createWriteStream(dist)
                request(item).pipe(stream).on('close', function (err) {
                    if (err) console.log(err)
                    console.log('文件', item, '下载完毕')
                })
            }
        }).catch(err => {
            console.log('error:',err)
        })
    })
}

function mkMultDir(path) {
    return new Promise( resolve => {
        if(!fs.existsSync(path)) {
            let arr = path.split('\\')
            let temp = arr[0]
            for(let i=1;i<arr.length;++i) {
                temp = `${temp}/${arr[i]}`
                if(!fs.existsSync(temp)) {
                    fs.mkdirSync(temp)
                }
            }
        }
        resolve()
    }).catch(err => {
        console.log('error1:',err)
    })
}

module.exports = download