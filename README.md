# DragNDrop Todo

## Planned Features
- adding and removing lists
- adding and removing todos to and from lists
- dragging todos from one list to another
- automatically saving lists, probably via indexedDB

## Roadmap
1. [x] save data only, reconstruct HTML (its not needed)
   1. [x] requires restructuring of save-data to include indices
   2. [x] resize textareas on loading data. maybe save the size of the textarea?
2. [ ] show number of open tasks of the day in tab
3. [x] make table responsive
4. [x] responsive, mobile-first design in general
5. [ ] rework saving and loading to use indexedDB instead
6. [ ] implement accounts and a small synchronization server
7. [ ] implement options
8. [ ] implement manual css, changeable via js and saveable
9. [x] rework columns. maybe dynamic via options?
10. [ ] clean up code

## Roadmap Version 0.2
1. [x] get regular code to work again (saving, loading and that stuff)
   - [x] saving
   - [x] loading
   - [x] import
   - [x] export
2. [x] finish new menu
3. [x] change saving to always save after changes
4. [x] add info of last save time
5. [x] finish styling (screw material design, just do what works for me)
6. [x] add divider functionality
7. [x] add coloring for due and overdue cards
8. [x] cleanup

Progress: 🟩🟩🟩🟩🟩🟩🟩🟩

## Roadmap Version 1.0
- [x] add drag handle to dividers
- [ ] switch to indexedDB via dexie
- [ ] add legend
- [ ] proper english
- [ ] show number of open tasks of the day in tab
- [ ] add options:
  - [ ] language
  - [ ] card width
  - [ ] colors and color rules?
  - [ ] font family
  - [ ] light / dark mode
- [ ] add a version check via AJAX
- [ ] autofocus task name when adding one
- [ ] add placeholder texts for card fields
- [ ] cleanup


## Resources
- https://fonts.google.com/icons?hl=de&selected=Material+Symbols+Rounded:delete:FILL@0;wght@400;GRAD@0;opsz@48&icon.style=Rounded
- https://m2.material.io/design/color/the-color-system.html#tools-for-picking-colors
- https://github.com/yusufsefasezer/ysEditor.js/
- https://stackoverflow.com/questions/6964144/dynamically-generated-favicon
