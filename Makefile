.PHONY: build
build:
	@if [ ! -d ./build ]; then mkdir build; fi;
	@zip -q -j build/google_earth_plus.zip \
	manifest.json \
	icon128.png \
	content_script.js \
	popup.html \
	popup.js \
	style.css;

.PHONY: clean
clean:
	@if [ ! -d ./build ]; then rm -rf ./build; fi;