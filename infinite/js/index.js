

var ITEM_NUM = 30,
    TOMBSTONE_NUM = 30,
    TOMBSTONE_DEFAULT_WIDTH = 500,
    TOMBSTONE_DEFAULT_HEIGHT = 80;
function InfiniteScroll() {
    this._foot = null;
    this._footMark = 0;
    this._paneHeight = 0;
    this._listEl = null;
    this._items = [];
    this._itemStart = 0;
    this._tombstone = [];
    this._tombstoneIdx = 0;
    this.boxScrollTop = 0;
}

InfiniteScroll.prototype = {
    init: function(config) {
        this._listEl = config.el;
        this.showRows = config.showRow || 10;
        this._paneHeight = this._listEl.clientHeight;
        this._foot = document.createElement('div');
        this._foot.style.position = 'absolute';
        this._foot.style.width = '1px';
        this._foot.style.height = '1px';
        this._foot.style.transition = 'transform 0.2s';
        this._listEl.appendChild(this._foot);
        this._initViewBlock();
        this._initTombstone();
        this.fillContent(0,0);
        this._listEl.addEventListener('scroll', this._onScroll.bind(this));  
        window.addEventListener('resize',this._onResize.bind(this));
    },

    _initTombstone: function() {
        var fragment = document.createDocumentFragment();
        for(var i=0;i<TOMBSTONE_NUM;++i) {
            var dom = document.createElement('div');
            dom.className = 'tombstone hidden';
            dom.style.width = TOMBSTONE_DEFAULT_WIDTH + 'px';
            dom.style.height = TOMBSTONE_DEFAULT_HEIGHT + 'px';
            dom.style.transition = 'transform 0.2s';
            dom.style.transform = 'translateY(' + (TOMBSTONE_DEFAULT_HEIGHT+10)*i + 'px)';
            this._tombstone.push(dom);
            fragment.appendChild(dom);
        }
        this._listEl.appendChild(fragment);
    },

    _initViewBlock: function() {
        var fragment = document.createDocumentFragment();
        for(var i=0;i<ITEM_NUM;++i) {
            var dom = document.createElement('div');
            dom.className = 'temp';
            dom.style.width = TOMBSTONE_DEFAULT_WIDTH + 'px';
            dom.style.height = TOMBSTONE_DEFAULT_HEIGHT + 'px';
            dom.style.transition = 'transform 0.2s';
            dom.style.transform = 'translateY(' + (TOMBSTONE_DEFAULT_HEIGHT+10)*i + 'px)';
            fragment.appendChild(dom);
            this._items.push({
                data: null,
                node: dom,
                width: TOMBSTONE_DEFAULT_WIDTH,
                height:TOMBSTONE_DEFAULT_HEIGHT,
                top:  (TOMBSTONE_DEFAULT_HEIGHT+10)*i
            })
        }
        this._listEl.appendChild(fragment);
    },
    _onScroll: function() {
        var delta = this._listEl.scrollTop - this.boxScrollTop;
        if(delta > 0) {
            this.fillContent(this._itemStart+1,this._listEl.scrollTop);
        } else {
            this.fillContent(this._itemStart-1,this._listEl.scrollTop);
        }
    },

    _onResize: function(e) {

    },
    requestContent: function() {
        var self = this;
        setTimeout(function() {
            self.addContent();
        })
    },
    fillContent: function(start,scrollTop) {
        this._itemStart = start;
        if(start+ITEM_NUM > this._items.length) {
            var tombstone = this._tombstone[this._tombstoneIdx++];
            tombstone.className = 'tombstone';
            tombstone.style.transfrom = 'translateY(' + this._footMark + 'px)';
            this._footMark += TOMBSTONE_DEFAULT_HEIGHT + 10;
            this.requestContent();
        } else {   
            for(var i=start;i<start+ITEM_NUM;++i) {
                if(this._items[i].node === null) {
                    this._items[i].node = this._items[i%ITEM_NUM].node;
                    this._items[i].width = TOMBSTONE_DEFAULT_WIDTH;
                    this._items[i].height = TOMBSTONE_DEFAULT_HEIGHT;
                    this._items[i].top = (TOMBSTONE_DEFAULT_HEIGHT+10)*i;
                } 
                this._items[i].node.className = 'temp';
                this._items[i].node.style.width = this._items[i].width;
                this._items[i].node.style.height = this._items[i].height;
                this._items[i].node.style.transform = 'translateY(' + this._items[i].top + ')';
                if(this._footMark < this._items[i].top + TOMBSTONE_DEFAULT_HEIGHT+10 ) {
                    this._footMark = this._items[i].top + TOMBSTONE_DEFAULT_HEIGHT+10;
                }
            }
        }
    },
    addContent: function() {
        for(var i=0;i<ITEM_NUM;++i) {
            this._items.push({
                data: null,
                node: null,
                width: 0,
                height: 0,
                top: 0
            })
        }
        this.fillContent(this._itemStart,this._itemEnd);
    }
}