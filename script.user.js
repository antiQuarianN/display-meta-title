// ==UserScript==
// @name         Display meta title
// @namespace    https://github.com/antiQuarianN
// @version      3.3.1
// @description  Displays the meta title above the <body> tag. There is an option to hide and unhide.
// @author       antiQuarianN
// @match        *://*/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/antiQuarianN/display-meta-title/main/script.user.js
// @downloadURL  https://raw.githubusercontent.com/antiQuarianN/display-meta-title/main/script.user.js
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    let titleContainer;
    let showButton;
    let isTitleVisible = true;

    function displayMetaTitle() {
        const metaTitle = document.title;

        titleContainer = document.createElement('div');
        titleContainer.style.position = 'fixed';
        titleContainer.style.top = '10px';
        titleContainer.style.left = '50%';
        titleContainer.style.transform = 'translateX(-50%)';
        titleContainer.style.backgroundColor = '#ffd919';
        titleContainer.style.borderRadius = '10px';
        titleContainer.style.padding = '10px 20px';
        titleContainer.style.zIndex = '9999';
        titleContainer.style.fontSize = '16px';
        titleContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        titleContainer.style.color = '#000';
        titleContainer.style.display = 'flex';
        titleContainer.style.alignItems = 'center';

        const titleElement = document.createElement('span');
        titleElement.textContent = metaTitle;
        titleElement.style.cursor = 'pointer';

        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.style.cursor = 'pointer';
        copyButton.style.padding = '5px 10px';
        copyButton.style.fontSize = '14px';
        copyButton.style.marginLeft = '10px';

        copyButton.addEventListener('click', function () {
            if (isTitleVisible) {
                navigator.clipboard.writeText(metaTitle).then(function () {
                    alert('Title copied to clipboard');
                }, function (err) {
                    console.error('Could not copy text: ', err);
                });
            }
        });

        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Hide';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.padding = '5px 10px';
        toggleButton.style.fontSize = '14px';
        toggleButton.style.marginLeft = '10px';

        toggleButton.addEventListener('click', function () {
            if (isTitleVisible) {
                titleContainer.style.display = 'none';
                toggleButton.textContent = 'Show';
                isTitleVisible = false;
                showButton.style.display = 'block';
            } else {
                titleContainer.style.display = 'flex';
                toggleButton.textContent = 'Hide';
                isTitleVisible = true;
                showButton.style.display = 'none';
            }
        });

        titleContainer.appendChild(titleElement);
        titleContainer.appendChild(copyButton);
        titleContainer.appendChild(toggleButton);

        document.body.appendChild(titleContainer);

        showButton = document.createElement('button');
        showButton.textContent = 'Show meta';
        showButton.style.position = 'fixed';
        showButton.style.bottom = '10px';
        showButton.style.right = '10px';
        showButton.style.cursor = 'pointer';
        showButton.style.padding = '5px 10px';
        showButton.style.fontSize = '14px';
        showButton.style.backgroundColor = '#ffd919';
        showButton.style.color = '#000';
        showButton.style.border = 'none';
        showButton.style.borderRadius = '5px';
        showButton.style.zIndex = '10000'; // Always on top
        showButton.style.display = 'none';

        showButton.addEventListener('click', function () {
            titleContainer.style.display = 'flex';
            toggleButton.textContent = 'Hide';
            isTitleVisible = true;
            showButton.style.display = 'none';
        });

        document.body.appendChild(showButton);
    }

    displayMetaTitle();
})();