var domElement = function(selector) {
    this.selector = selector || null;
    this.element = null;
};

domElement.prototype.init = function() {
    this.element = document.querySelectorAll(this.selector);
};

domElement.prototype.click = function (fn) {

    var elements = document.querySelectorAll(this.selector);

    elements.forEach(function(el) {
        el.addEventListener('click', fn);
    });

    return this;
};

domElement.prototype.toggleClass = function(className) {

    var elements = document.querySelectorAll(this.selector);

    elements.forEach(function(el) {
        el.classList.toggle(className);
    });

    return this;
};

var $ = function(selector) {
    var el = new domElement(selector);

    el.init(selector);

    var c =0;
    for (var key in el) {
        if (el.hasOwnProperty(key) && key === 'element') {
            el[c++] = el.element[c];
        }
    }
    el.splice = function() {};
    el.length = c;

    return el;
};
