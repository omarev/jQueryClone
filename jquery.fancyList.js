domElement.prototype.fancyList = function(items, options = { checkAll: false }, callback) {

    var image = '<img src="https://raw.githubusercontent.com/bystac/fancy-list/master/checkbox.png" width="16"/>',
    container = document.querySelector(this.selector);

    container.className = options.containerClass || 'fancyList';

    if (options.checkAll) {
        items.unshift('All/None');
    }

    items.forEach(function(item, index) {
        let li = document.createElement(options.ElementTag || 'div');
        li.classList.add(options.ElementClass || 'fancyListItem');
        li.addEventListener('click', function() {

            this.classList.toggle('checked');
            this.dataset.checked = this.classList.contains('checked');

            if (options.checkAll) {
                if ('false' === this.dataset.checked) {
                    container.childNodes[0].dataset.checked = false;
                    container.childNodes[0].classList.toggle('checked', false);
                }

                if (0 === index) {
                    let checkAllNode = this;
                    container.childNodes.forEach(function(node) {
                        node.classList.toggle('checked', checkAllNode.classList.contains('checked'));
                        node.dataset.checked = checkAllNode.classList.contains('checked');
                    });
                }
            }

            if (callback) {
                let selectedItems = [];
                container.childNodes.forEach(function(node, nodeIndex) {
                    if ('true' === node.dataset.checked && (!options.checkAll || (options.checkAll && nodeIndex > 0))) {
                        selectedItems.push(node.dataset.value);
                    }
                });
                callback(selectedItems);
            }
        }, true);

        li.dataset.value = item;
        li.dataset.checked = false;
        li.insertAdjacentHTML('beforeend', image + ' ' + item );
        container.append(li);
    });

    return this;
};
