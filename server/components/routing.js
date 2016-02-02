var routes = {},
    router = {},
    allowCO = false;

router.create = function(name, method, handler) {
    if (!routes[method]) routes[method] = {};
    routes[method][name] = handler;
    if (method === 'POST') {
        routes[method][name] = function (req, res) {
            var body = '';
            req.on('data', function(chunk) {
                body += chunk;
            });
            req.on('end', function() {
                req.params = JSON.parse(body);
                handler(req, res);
            });
        };
    } else {
        routes[method][name] = handler;
    }
};


router.check = function(req, res) {
    var method = req.method,
        url = req.url;

    if (allowCO) {
        router.setCrossOrigin(res);
    }

    if (routes[method] && routes[method][url]) {
        routes[method][url](req, res);
    } else {
        res.statusCode = 404;
        res.end('Page not found');
    }
};

router.setCrossOrigin = function(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'accept, content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
};

router.allowCrossOrigin = function () {
    allowCO = true;
};


module.exports = router;