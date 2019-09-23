
list=(
	"release/wxgame/js"
	"release/wxgame/libs"
	"release/wxgame/opendata/res"
	"release/wxgame/opendata/ui"
	"release/wxgame/opendata/js"
	"release/wxgame/opendata/libs"
)

for var in ${list[@]};  
do  
	if [ -d "$var" ]; then
		rm  -rf "$var"
	fi
done

if [ -f "release/wxgame/code.js" ]; then
	uglifyjs "release/wxgame/code.js" -c -m -o "release/wxgame/pcode.js"
	rm -rf "release/wxgame/code.js"
	rm -rf "release/wxgame/LayaScene_newrace"
	rm -rf "release/wxgame/LayaScene_newraceshow"
	rm -rf "release/wxgame/music"
	rm -rf "release/wxgame/tongyong/skin"
	mv "release/wxgame/pcode.js" "release/wxgame/code.js"
fi

if [ -f "release/wxgame/opendata/code.js" ]; then
	uglifyjs "release/wxgame/opendata/code.js" -m -o "release/wxgame/opendata/pcode.js"
	rm -rf "release/wxgame/opendata/code.js"
	mv "release/wxgame/opendata/pcode.js" "release/wxgame/opendata/code.js"
fi

exit 0