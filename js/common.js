// var baseURL = "http://localhost:63342/common/static/";
//var baseURL = "http://localhost:8080/common/";
let baseURL = "http://localhost/common/", webVue = {}, showcaseComp = {},
    isEn = !localStorage.getItem("isEn") ? true : localStorage.getItem("isEn") === 'true';

function jumpToPage(url) {
    //window.open(baseURL + url, '_self');
    window.location.href = baseURL + url;
}

function selectedNav(navIndex) {
    setTimeout(function () {
        $('#nav-' + navIndex).addClass("itemSelected");
    }, 5000)
}

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function resize() {
    const html = document.querySelector("html");
    const width = html.getBoundingClientRect().width; //拿到适配器的宽度值
    //若屏幕宽为375px则1rem = 100px 若不是则按比例增大或减小
    html.style.fontSize = width / 3.75 + 'px';
}

function remChange() {
    remove();
    let width = window.screen.width;
    let fixedw = 750;
    let scale = width / fixedw; //获取到的屏幕宽度比上自定义的750宽度 获得对应比例
    let meta = document.createElement("meta");
    meta.setAttribute('name', 'viewport');
    //将对应比例填入meta标签即可实现宽度自适应
    meta.setAttribute('content', `width=device-width, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no`);
    //meta将标签添加到文档中即可
    document.head.appendChild(meta);
}
function remove() {
    let meta = document.querySelector("meta[name='viewport']");
    if (meta != null) {
        document.head.removeChild(meta);
    }
}

function goBack() {
    history.back();
}

document.onkeydown = function (event) {
    var e = event || window.event;
    if (e.keyCode === 33) {
        console.log("press pageUp key")
        document.body.scrollTop -= 700;
    }
    if (e.keyCode === 34) {
        console.log("press pageDown key")
        document.body.scrollTop += 700;
    }
    if (e.keyCode === 38) {
        console.log("press up arrow key")
        document.body.scrollTop -= 300;
    }
    if (e.keyCode === 40) {
        console.log("press down arrow key")
        document.body.scrollTop += 300;
    }
};

var os = function() {
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
    };
}();


function getShowcaseComp(isEn) {
    return Vue.component('show-case', {
        template: '#show-case',
        data() {
            return {
                widthRate: document.body.clientWidth / 1390,
                heightRate: window.screen.availHeight / 728,
                eveContents: [],
                timeLines: []
            }
        },
        methods: {
            getShowCases() {
                this.$http.get('./data/index.json').then(res => {
                    var showCases = res.body.showCases, arrData = [];
                    for (let i = 0; i < showCases.length; i++) {
                        arrData[i] = {
                            year: showCases[i].year,
                            date: "01/01/" + showCases[i].year,
                            content: isEn ? showCases[i].content : showCases[i].content_cn
                        };
                    }
                    this.eveContents = arrData;
                })
            }
        },
        created() {
            this.getShowCases();
        },
        mounted() {
            tryInit();
        },
        beforeUpdate() {

        },
        updated() {
            let aList = $('div.events').find('a');
            let i = 0, length = aList.length;
            if (length == 0) return;

            function extracted() {
                setTimeout(function () {
                    if (i == length - 1) {
                        i = 0;
                    } else {
                        i += 1;
                    }
                    $(aList[i]).click();
                    extracted();
                }, 8000);
            }

            extracted();
        },
        beforeDestroy() {
            delete this.showCases
        }
    });
}