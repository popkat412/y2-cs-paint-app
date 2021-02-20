# y2-cs-paint-app

## TODO
- [ ] Implement rect/ellipse
- [ ] Show layers properly (shown on top == appears on top)
- [ ] Confirm before close tab
- [ ] Ability to delete layers
- [ ] Fix layer bug where if you erase on the top layer, the bottom layer also gets erased
        This is due to the eraser drawing the background color instead of it clearing the pixels
- [x] Undo/Redo
- [x] Update currently selected layer when layers are rearranged
- [x] Fix opacity bug
- [x] Add better CSS
- [x] Show indicator of size
- [x] Save canvas option

## Features
- [ ] hold shift to lock square/circle in rect/ellipse tool
- [ ] Collapsible left bar
- [ ] Add text
- [ ] Keyboard Shortcuts + General help page
- [ ] Each tool has info associated to it
- [ ] Bucket fill
- [ ] save as json/binary dump
- [ ] select tool???
- [ ] upload image???

## Documentation
TODO (_lol_)

### Layers
Layers are shown on the right, (it should be that) the layer that is shown on top, is drawn on top,
but in the actual code, its implemented as an array and it gets drawn from start to end,
so the topmost layer is actually at the back.  
Things are done this way so its easier to add layers (just push to the end)
and also drawing is easier (can do for...of loop instead of needing custom loop to loop backwards)

## Keyboard Shortcuts
**Color**
_Note: all color shortcuts have prefix `c`_
- `cr`: Change color to red
- `cg`: Change color to green
- `cb`: Change color to blue
- `cy`: Change color to yellow
- `cw`: Change color to white
- `cB`: Change color to black
**Tool**
- `e`: Change tool to equation
- `p`: Change tool to pen

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
