# demov2

## Project details  
Image files are being used from file selection (see section below)  

---
The AI's answer can be shown by changing the label's text field  
- change by accessing the data field **AIanswer** in file *App.vue*
---
The **Reveal** button can only be used once, and then it disappears  
User has to enter text into the field  
There is no current mechanic of comparing the answers *TODO*  
  
The player can **RESET** once they've entered and submitted an answer  
- resetting doesn't refresh the page
- it only resets the values in *data* and the canvas to their defaults
- the overall progress (score and names) should be saved until the page is refreshed
---
The score is calculated based on the formula: 10*(60-time(s))
This means if the guess takes 30 seconds or longer, the score received is 0  
**Need a scoring mechanic, compare answers from AI to human to real answer**  

---
### How images are saved to program
1. images are selected by the file browser
2. image data is saved as blobs to localStorage (*limits to 5MB, doesn't seem to have any problems yet*)
3. randomized selection pulled from localStorage and displayed
- *will have to match this to answer from text file somehow*
  
*TODO:* 
- *could use custom dialog boxes*
- *work on transitions*
- *improve design (color scheme?)*
- *scoring mechanic, maybe text file to array for answers?*

Additional packages added include:
- Slim Dialog for VueJS
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
