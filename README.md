### Shortcut modifications to Google Earth Web for Chrome
Do you love Google Earth but hate how you have to click the street view button at the bottom right of the screen again every time you click the button all the way at the top left of the screen to quit street view? Do you hate how it doesn't reset to top-north view afterwards so you also have to click the compass button? Do you hate how you have to move your hand all over the keyboard to use some of the shortcuts? Then you might like this Chrome extension.

### Installation
* Clone or download the files to a directory.
* Make sure developer mode is enabled in Chrome
* Go to [chrome://extensions](chrome://extensions)
* Click "Load unpacked" at the top left
* Select the directory containing the files

Note: You may need to press Z every time you open Google Earth in a new tab to make some of the shortcuts work.

### What does it do?
The main reason I wanted to create this was to make entering and exiting street view mouse-click-free. The extension maps the F key to the top-north view shortcut and the D and E keys to the street view toggle button by default. You can also press D or E while in street view mode to quit it and go back to map view mode. It also modifies many other shortcuts that are scattered all over the keyboard to bring them near the left hand home row so you can use them without lifting your hand.

### Why?
You can keep your left hand at its natural home row position on the keyboard and save yourself many mouse clicks to make your Google Earth experience much smoother.

### How do I customize the keys?
Edit the constants at the top of the content_script.js file.

### More features?
Don't count on it. Feel free to fork.

### License?
Zlib. See [https://opensource.org/licenses/Zlib](https://opensource.org/licenses/Zlib).

### Known issues
* Most of the time some shortcuts don't work at first. Simply press Z once the page loads to fix.
* If your computer is slow, disabling certain shortcuts when search is on might lag and remove focus from search. Wait for a short while after opening search or first press something that isn't mapped to a shortcut as a workaround. If your computer is slow enough to be impacted by this you are probably used to stuff like this.