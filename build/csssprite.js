const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = [
    new SpritesmithPlugin({
        src: {
            cwd: path.resolve(__dirname, '../assets/spr/1/words'), // 图标根路径
            glob: '*.png' // 匹配任意 png 图标
        },
        target: {
            image: path.resolve(__dirname, '../assets/spr/1/dist/words.png'), // 生成雪碧图目标路径与名称
            // 设置生成CSS背景及其定位的文件或方式
            css: path.resolve(__dirname, '../assets/spr/1/dist/words.css')
        },
        apiOptions: {
            cssImageRef: "/img/words.png" //css根据该指引找到sprite图
        },
        spritesmithOptions: {
            padding: 2
        }
    })
]
