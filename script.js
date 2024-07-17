// ==UserScript==
// @name         Display meta title
// @namespace    https://github.com/antiQuarianN
// @version      3.2.1
// @description  Displays the meta title above the <body> tag. There is an option to hide and unhide.
// @author       antiQuarianN
// @match        *://*/*
// @grant        none
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    let titleContainer; // Global variable to hold the title container
    let isTitleVisible = true; // Variable to track title visibility

    // Function to create and display the meta title
    function displayMetaTitle() {
        // Get the meta title of the page
        const metaTitle = document.title;

        // Create a container for the title display
        titleContainer = document.createElement('div');
        titleContainer.style.position = 'fixed';
        titleContainer.style.top = '10px';
        titleContainer.style.right = '10px';
        titleContainer.style.width = 'auto';
        titleContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        titleContainer.style.border = '1px solid #ccc';
        titleContainer.style.padding = '10px';
        titleContainer.style.zIndex = '9999';
        titleContainer.style.textAlign = 'center';
        titleContainer.style.fontSize = '16px';
        titleContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        titleContainer.style.display = 'block';
        titleContainer.style.opacity = '1'; // Default opacity

        // Create the title element
        const titleElement = document.createElement('span');
        titleElement.textContent = metaTitle;
        titleElement.style.marginRight = '10px';
        titleElement.style.cursor = 'pointer';

        // Create the copy button
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.style.cursor = 'pointer';
        copyButton.style.padding = '5px 10px';
        copyButton.style.fontSize = '14px';
        copyButton.style.marginLeft = '10px';

        // Add event listener for copying the title
        copyButton.addEventListener('click', function () {
            navigator.clipboard.writeText(metaTitle).then(function () {
                alert('Title copied to clipboard');
            }, function (err) {
                console.error('Could not copy text: ', err);
            });
        });

        // Create the toggle button (Show/Hide)
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Hide';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.padding = '5px 10px';
        toggleButton.style.fontSize = '14px';
        toggleButton.style.marginLeft = '10px';

        // Add event listener for toggling the title visibility
        toggleButton.addEventListener('click', function () {
            if (isTitleVisible) {
                // Hide the title container
                titleContainer.style.opacity = '0';
                toggleButton.textContent = 'Show';
                isTitleVisible = false;
                showButton.style.display = 'block'; // Show the "Show" button
            } else {
                // Show the title container
                titleContainer.style.opacity = '1';
                toggleButton.textContent = 'Hide';
                isTitleVisible = true;
                showButton.style.display = 'none'; // Hide the "Show" button
            }
        });

        // Append elements to the container
        titleContainer.appendChild(titleElement);
        titleContainer.appendChild(copyButton);
        titleContainer.appendChild(toggleButton);

        // Insert the container into the document body
        document.body.appendChild(titleContainer);

        // Create the show button
        const showButton = document.createElement('button');
        showButton.textContent = 'Show';
        showButton.style.position = 'fixed';
        showButton.style.top = '10px';
        showButton.style.right = '10px';
        showButton.style.cursor = 'pointer';
        showButton.style.padding = '5px 10px';
        showButton.style.fontSize = '14px';
        showButton.style.opacity = '0.5'; // Semi-transparent by default
        showButton.style.display = 'none'; // Initially hidden

        // Add event listener for showing the title container
        showButton.addEventListener('click', function () {
            titleContainer.style.opacity = '1';
            toggleButton.textContent = 'Hide';
            isTitleVisible = true;
            showButton.style.display = 'none'; // Hide the "Show" button again
        });

        // Insert the show button into the document body
        document.body.appendChild(showButton);
    }

    // Run the displayMetaTitle function
    displayMetaTitle();
})();