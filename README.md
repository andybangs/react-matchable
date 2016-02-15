# React Matchable

A quiz app inspired by the Clickable Matching Quiz format by <a href="http://www.sporcle.com">Sporcle</a>.

#### React Matchable uses
- <a href="https://facebook.github.io/react/">React</a> for the UI
- <a href="https://github.com/reactjs/redux">Redux</a> for managing state
- <a href="https://github.com/yelouafi/redux-saga">Redux Saga</a> for managing side effects
- <a href="http://stack.formidable.com/radium/">Radium</a> for additional inline styling capabilities
- <a href="https://lodash.com/">Lodash</a> for functional programming helpers

## Instructions
  
#### 1. Setup

```$ npm install```

#### 2. Run

```$ npm start``` for development with webpack-dev-server and hot module replacement

```$ npm run build ``` to build once for production 
  
## Notes

- All state is stored in a single object, allowing view components to be pure functions

- Periodic updates to the timer are scheduled using a saga

- Quiz data can contain 2 or more columns
  
## License

MIT
