// ==UserScript==
// @name                 FreeCodeCamp No Donation Pop-up
// @name:zh-TW           FreeCodeCamp 移除捐款彈出式視窗
// @name:zh-HK           FreeCodeCamp 移除捐款彈出式視窗
// @name:zh-CN           FreeCodeCamp 移除捐款弹出式视窗
// @namespace            https://github.com/tszhong0411/freecodecamp-no-donation-popup
// @description          Remove donation popup in FreeCodeCamp
// @description:zh-TW    移除 FreeCodeCamp 中的捐款彈出式視窗
// @description:zh-HK    移除 FreeCodeCamp 中的捐款彈出式視窗
// @description:zh-CN    移除 FreeCodeCamp 中的捐款弹出式视窗
// @author               tszhong0411
// @version              1.0.0
// @icon                 https://www.google.com/s2/favicons?sz=64&domain=www.freecodecamp.org
// @match                *://www.freecodecamp.org/learn/*
// @match                *://www.freecodecamp.org/*/learn/*
// @license              MIT
// @grant                none
// @downloadURL          https://update.greasyfork.org/scripts/494247/FreeCodeCamp%20No%20Donation%20Pop-up.user.js
// @updateURL            https://update.greasyfork.org/scripts/494247/FreeCodeCamp%20No%20Donation%20Pop-up.meta.js
// ==/UserScript==

(function() {
  'use strict';

  // Function to remove the popup elements
  function removePopup() {
      // Select the root element
      const portalRoot = document.getElementById('headlessui-portal-root');

      // Check if the root element exists and contains the donation-modal
      if (portalRoot && portalRoot.querySelector('.donation-modal')) {
          // Remove the entire root element
          portalRoot.remove();

          // Enable scrolling on the root element if it was made inert
          const root = document.querySelector('#___gatsby');
          if (root && root.inert) {
              root.inert = false;
          }
      }
  }

  // Create a new MutationObserver
  const observer = new MutationObserver(mutationsList => {
      for (let mutation of mutationsList) {
          // Check if nodes were added to the DOM
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
              // Run the function to remove the popup
              removePopup();
          }
      }
  });

  // Start observing changes in the body and its descendants
  observer.observe(document.body, { childList: true, subtree: true });
})();