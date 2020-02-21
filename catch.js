require('chromedriver')
var path = require('path')
var download = require('./download')
var distPath = process.argv[2] 
var url = process.argv[3] || ''
if (url) {
    var webdriver = require('selenium-webdriver')
    var logging = webdriver.logging
    var preferences = new logging.Preferences()
    preferences.setLevel(logging.Type.PERFORMANCE, logging.Level.ALL)
    var driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setLoggingPrefs(preferences)
        .build()
    driver.get(url).then(() => {
        setInterval(() => {
            driver.manage().logs().get(logging.Type.PERFORMANCE)
                .then(entries => {
                    var list = []
                    if (entries.length > 0) {
                        prevEntries = entries
                        entries.forEach((entry) => {
                            //console.log('test:',JSON.parse(entry.message).message.params.response)
                            var params = JSON.parse(entry.message).message.params
                            if (params.response && params.response.url) {
                                list.push(params.response.url)
                            }
                        })
                        return list
                    }
                    else {
                        return null
                    }
                })
                .then((list) => {
                    console.log('test:',list)
                    if (list !== null) {
                        var opts = {
                            path: distPath,
                            list: list
                        }
                        download(opts)
                    }
                })
        }, 5000)
    })
} else {
    console.error('请输入游戏地址')
}
