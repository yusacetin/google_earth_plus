# Custom Keyboard Shortcuts for Google Earth Web
The main reason I wanted to create this was to make entering and exiting street view mouse-click-free. I always use the default orientation so I also wanted to be able to reset the view without moving my hands. The extension maps the F key to the reset view shortcut and the D and E keys to the street view toggle button by default. You can also press D or E while in street view mode to quit it and go back to map view mode. It also modifies many other shortcuts that are scattered all over the keyboard to bring them near the left hand home row (for QWERTY keyboards) so you can use them without lifting your hand. You can easily customize the keys from the extension pop up.

## Why?
You can keep your left hand at its natural home row position on the keyboard and save yourself many mouse clicks to make your Google Earth experience much smoother.

## Installation
### From source
* Clone or download the files to a directory.
* Make sure developer mode is enabled in Chrome
* Go to chrome://extensions
* Click "Load unpacked" at the top left
* Select the directory containing the files

### From Chrome Web Store
* Install from https://chrome.google.com/webstore/detail/custom-shortcuts-for-goog/kofhcoakfkjahhenjfoaioapdbogaeil

## How it works
There are two ways in which the modified shortcuts are applied, one is for "non-native" shortcuts and the other is for "native" shortcuts.

Native shortcuts are shortcuts that are already implemented by Google and set to values that can't be changed by default. These shortcut keys are determined by the value of the "keys" attribute of their corresponding "earth-kb-shortcut" HTML tags. In order to implement native shortcut key modifications, the "keys" attribute in these HTML tags are replaced with user values. These shortcuts support key combinations with Control, Shift, and Alt keys by default, but they do not support multiple different keys/key combinations. Key combinations can be set by using "ctrl" for Control, "shift" for Shift, and "alt" for the Alt keys, and using "+" to combine them.

Non-native shortcuts are for functions that are available via clickable buttons but don't have a Google implemented shortcut. These shortcuts are implemented by finding the GUI button and simulating a click when the corresponding key/key combination is pressed. They are implemented in a way that supported the setting of multiple different keys and key combinations. Key combinations can be set the same way native shortcut combinations are set, and to set multiple keys/combinations separate the different keys/combinations with ",".

I also added multiple keys/combinations support for native shortcuts that also have a clickable button associated with their functionality. For these shortcuts, the first key/combination saved by the user is registered as a native shortcut and the others are registered as non-native shortcuts. Not all native shortcuts also have a clickable button, so they can't be executed in the way I execute non-native shortcuts. Native shortcuts that don't have a button are marked with a superscript "1" in the extension pop up.

As of now, toggling gridlines only works when you click on the screen at least once after panning. It is marked with a "*" in the extension pop up.

## License
GNU General Public License version 3 or later. See LICENSE.txt for more information.