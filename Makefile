.PHONY: all clean


all:
	python3 -m http.server


clean:
	-rm -f package-lock.json
	-rm -r ./node_modules
	-npm cache verify


node_modules/: package.json
	npm install
	-touch node_modules/
