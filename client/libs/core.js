var WFramework = function (config, routes, controllers) {
    var self = this;
    this.cache = [];
    this.config = config;
    this.routes = routes;
    this.controllers = controllers;
};
WFramework.prototype = {
    init: function () {
        var self = this;
        this.hashChange();
        window.onhashchange = function () {
            self.hashChange();
        }
    },
    tmpl: function (str, data) {
        var fn = !/\W/.test(str) ? this.cache[str] = this.cache[str] || this.tmpl(document.getElementById(str).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return data ? fn(data) : fn;
    },
    createRequest: function (config) {
        var xhr = new XMLHttpRequest();
        xhr.open(config.type, config.url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status != 404) {
                    config.done(JSON.parse(xhr.responseText));
                } else {
                    config.fail();
                }
            }
        };
        var data = null;
        if (config.type === 'POST') {
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            data = JSON.stringify(config.data)
        }
        xhr.send(data);
    },
    hashChange: function () {
        var res, string = '';
        var params = [];
        var hash = location.hash.replace('#', '').split('/');
        Object.keys(this.routes).forEach(function (key) {
            var route = key.split('/');
            if (route.length == hash.length) {
                var equal = route.length;
                for (var i = 0; i < hash.length; i++) {
                    if (route[i] == hash[i] || route[i] == '*') {
                        equal--;
                        if (route[i] == '*') {
                            params.push(hash[i]);
                        }
                    }
                }
                if (equal == 0) {
                    res = key;
                }
            }
        });
        if (this.routes[res]) {
            string = this.routes[res];
            params.forEach(function (key) {
                string = string.replace('*', key);
            });
        } else {
            string = string ? string : location.hash == '' ? this.routes['/'] : location.hash;
        }
        this.checkRoute(string);
    },
    checkRoute: function (string) {
        var tmp = string.split('/');
        this.route = {};
        this.route.param = [];
        for (var i = 1; i < tmp.length; i++) {
            switch (i) {
                case 1:
                    this.route.controller = tmp[i] + 'Ctrl';
                    break;
                case 2:
                    this.route.action = tmp[i] + 'Action';
                    break;
                default:
                    this.route.param.push(tmp[i]);
                    break;
            }
        }
        if (this.controllers[this.route.controller]) {
            if (this.route.action) {
                this.controllers[this.route.controller][this.route.action](this, this.route.param);
            } else {
                this.controllers[this.route.controller]['indexAction'](this, null);
            }
        } else {
            this.controllers['materialCtrl']['notfoundAction'](this);
        }
    },
    processData: function (obj) {
        var str = '';
        Object.keys(obj).forEach(function(key, index) {
            if (index != 0) str += '&';
            str += key + '=' + encodeURIComponent(obj[key])
        });
        return str;
    }
};