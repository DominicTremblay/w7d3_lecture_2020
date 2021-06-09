# Data Fetching & Other Side Effects

## Content

- Side-effects
- Encapsulating side effects with the useEffect hook
  - Rules of hooks (recap)
  - Hooks lifecyle
  - Examples of useEffect

## Side Effects


- a funtion that depends on a global variable

```js

const total = 0;

const add = nb => {
  total += nb
}

const minus = nb => {
  total -= nb;
}

add(5); // total => 15
add(5); // total => 20
minus(10); // total => 10

- function should only depend on its input parameter
- function should always return the same value given the same input

- To reduce bugs, we need to _limit the side effects_ in our program

- a secondary effect (an interaction with the outside of the function) when running a function

  - Setting timers or intervals
  - Modifying DOM elements not controlled by React
  - A network request
  - Connection to a socket server
  - Adding and removing event listeners
  - Logging to the console

```js
// push modifies the original array 
const addTodo = todo => todos.push(todo);

// Network Request
const getTweets = () => fetch('/tweets/).then(res => res.json())

// Modifying a Dom element directly
const reset = (element) => element.value = '';
```

- Side Effects are generally undesirable because they can introduce a lot of bugs
- In React, they can disrupt the normal component rendering


## The useEffect Hook

To better handle side effects, React encapsulates them in a useEffect Hook.

### Recap of The Rules of Hooks

Rule #1
Don't call Hooks inside loops, conditions, or nested functions.

Rule #2

- Only call Hooks from the top-level of a function component or a custom Hook.

Rule #3
The effect method that we pass to useEffect must either return undefined or a function.
The easiest way to avoid issues with this rule is always to declare your effect as a multiline function.

### React Hooks Lifecyle

- [useEffect Sequence](./use_effect.png)
- [React Hooks Lifecycle](./hook_lifecycle.png)


### useEffect

- `useEffect` has 3 potential actions

  1. adding a side effect
  2. reinvoking the side effect (or not)
  3. cleaning up the side effect


#### Adding a useEffect

The syntax of the `useEffect` is the following:

```js
useEffect(() => {
  // execute side effect here
  return () => {
    // clean up any side effect that was added (ex. removing event listeners)
  };
}, [] // dependency array);
```

Examples: 
- [useEffect Intro Example](https://codesandbox.io/s/react-useeffect-intro-y8m93)

1. The useEffect takes a callback function that will execute the side effect

2. It returns optionally a `clean up` function

  - The clean up function will remove any side effects that were added
  - For example, adding event listeners in the useEffect might create a memory leak
  - The clean up function allows to removes the event listener

3. The second argument to the useEffect function is a dependency array

  - [], empty array => no dependency, the useEffect will run only once and will not be re-invoked
  - [value1, value2,...] => the array has one or more dependant variable. When the variable changes value, the useEffect is re-invoked
  - no dependency array provided => the useEffect is re-invoked after each render

  - by default react invokes the effect _after the render_ 
  

```js
useEffect(() => {
  console.log(
    'The effects re-execute after every render => no second parameter',
  );
});

//
useEffect(() => {
  console.log('Because the second parameter is [], the effect runs only once');
}, []);

// The effect depends on an outside value (someValue)
// The effect gets re-executed only if someValue has changed
useEffect(() => {
  console.log('The effect depends on an outside value');
}, [someValue]);
```

- [useEffect - Tweeter Character Count](https://codesandbox.io/s/useeffect-tweeter-character-count-uj3n3)

- [useEffect Usernames/count Example](https://codesandbox.io/s/nervous-hamilton-3ddlu)

##### Fetching Data

A typical use of a useEffect hook is to get the data from an API.

- [useEffect API Request](https://codesandbox.io/s/useeffect-api-request-xbmwg)

#### Clean Up

- optionally, useEffect can return a cleanup function. The cleanup fonction will execute right before the next effect execution or unmounting of the component. We may need a clean up function for the following among others:

- [removing eventListener](https://codesandbox.io/s/unruffled-austin-ytggf)
- removing a subscription (WebSocket)



