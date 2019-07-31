# demov2 COMPLETE

## Project details  
Image files are being used from file selection (see section below)  

---
The AI's answer can be shown by changing the label's text field  
- change by accessing the data field **AIanswer** in file *Home.vue*
---
The **Reveal** button can only be used once, and then it disappears  
User has to enter text into the field  
~~There is no current mechanic of comparing the answers~~  
   
Percentage of image increases if the player gets the answer wrong from 20% to 40%, then 40% to 60%.  
If player gets the answer correct, the results will be shown and the full image will be revealed.  
If the player gets the answer wrong at 60%, then the round is over and full image will be shown.  
  
The player can go to the **NEXT** image if their answer is correct or if they've answered wrong 3 times  
- doesn't refresh the page
- it only resets the values in *data* and the canvas to their defaults
- the overall progress (score and names) should be saved until the page is refreshed or reset button is pressed  
---
The score is calculated based on the formula: 10*(60-time(s))  
This means if the guess takes 30 seconds or longer, the score received is 0  
  
---
### How images are saved to program
1. images are selected by the file browser
2. image data is saved as blobs to localStorage (*limits to 5MB, doesn't seem to have any problems yet*)
3. randomized selection pulled from localStorage and displayed
- *will have to match this to answer from text file somehow*
  
*TODO:* 
- ~~*prevent randomizer from picking same number twice (pick number from array and delete)*~~
- ~~*UI overhaul: big player names above answer boxes, big timer between names and counts down from 15s*~~
- ~~*add number of rounds; begin by showing 20% of image; each round if answer is wrong, then show bigger % of image (20 -> 40 -> 60)*~~


Additional packages added include:
- ~~Slim Dialog for VueJS~~
- VeeValidate

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
