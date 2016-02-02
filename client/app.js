window.onload = function () {
    var app = new WFramework({
            area: document.getElementById('area')
        },
        {
            '/': '#/home'
        },
        {
            homeCtrl: {
                indexAction: function (self) {
                    var button = self.config.area.querySelector('button');
                    var panel = self.config.area.querySelector('.alert');
                    var config =  self.config.area.querySelector('input');
                    panel.style.display = 'none';

                    button.addEventListener('click', getNumber);

                    function getNumber() {
                        self.createRequest({
                            type: 'POST',
                            url: 'http://localhost:3000/prime-number',
                            data: {
                                maxValue: config.value
                            },
                            done: function (data) {
                                panel.style.display = 'block';
                                self.config.area.querySelector('.number-area').innerHTML = self.tmpl('article_tmpl', data);
                            },
                            fail: function () {
                                console.log('all bad');
                            }
                        });
                    }

                }
            },
            materialCtrl: {
                notfoundAction: function (self) {
                    self.config.area.innerHTML = 'Cтраница не найдена';
                    console.log('404');
                }
            }
        }
    );
    app.init();
};