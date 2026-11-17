export const Challenges = [
  {
    id: "closure-basic",
    title: "Predict the closure output",
    topic: "Closures",
    difficulty: "Easy",
    type: "output",
    code: `function createCounter() {
        let count = 0;
        return function () {
          count++;
          return count;
        };
        }
      const counter = createCounter();
      console.log(counter());
      console.log(counter());`, 
    question: "What will this code print?",
    options: [
      { id: "a", text: "1, then 1" },
      { id: "b", text: "1, then 2" },
      { id: "c", text: "0, then 1" },
      { id: "d", text: "undefined, then undefined" },
    ],
    correctAnswer: "b",
    hint: "Does the returned function still have access to count after createCounter finishes?",
    explanation: `The returned function closes over count, so it keeps access to the same 
    variable between calls. The first call increments it to 1; the second increments it to 2.`,
  },
  {
    id: "eventLoop-medium",
    title: "Predict the event loop output",
    topic: "Event Loop",
    difficulty: "Medium",
    type: "output",
    code:
    `
    console.log("Start");

    setTimeout(() => {
      console.log("Timeout");
    }, 0);

    Promise.resolve().then(() => {
      console.log("Promise");
    });

    console.log("End");`,
    question: "What will be the output?",
    options: [
      { id: "a", text: "Start → End → Timeout → Promise" },
      { id: "b", text: "Start → Promise → End → Timeout" },
      { id: "c", text: "Start → End → Promise → Timeout" },
      { id: "d", text: "Start → Timeout → Promise → End" },
    ],
    correctAnswer: "c",
    hint: `JavaScript executes synchronous code first. After that, it processes the microtask queue 
    before moving to the macrotask queue. Which queue does a Promise callback belong to, and which 
    queue does setTimeout belong to?`,
    explanation: `The output is Start → End → Promise → Timeout.
    First, the synchronous code executes, printing "Start" and "End".
    Next, the Promise callback runs because Promise.then() callbacks are placed in the microtask queue.
    Finally, the setTimeout callback runs from the macrotask queue. Even with a delay of 0ms, its 
    callback executes only after the synchronous code and microtasks have finished.`,
  },
  {
    id: "reactState-medium",
    title: "Predict the React state update",
    topic: "React State Updates",
    difficulty: "Medium",
    type: "output",
    code: `
    import { useState } from "react";

    function Counter() {
      const [count, setCount] = useState(0);

      const handleClick = () => {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
      };

      return <button onClick={handleClick}>Count: {count}</button>;
    }`,
    question: "What will the count be after clicking the button once?",
    options: [
      { id: "a", text: "1" },
      { id: "b", text: "2" },
      { id: "c", text: "3" },
      { id: "d", text: "0" },
    ],
    correctAnswer: "a",
    hint: `All three state updates use the same count value from the current render. 
    Think about how React processes these updates.`,
    explanation: `The count will be 1, not 3.

    Each setCount(count + 1) uses the same count value captured by the current render. Since count is initially 0, all three calls effectively request an update to 1.

    React batches these updates, so the final state is 1.

    To increment the count three times, use functional updates:

    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);

    Each update receives the result of the previous update, so the final count becomes 3.`,
  },
  {
    id: "staleClosure-medium",
    title: "Identify the stale closure in useEffect",
    topic: "React Hooks",
    difficulty: "Medium",
    type: "output",
    code: `
    function Counter() {
      const [count, setCount] = useState(0);

      useEffect(() => {
        const timer = setInterval(() => {
          console.log(count);
        }, 1000);

        return () => clearInterval(timer);
      }, []);

      return (
        <button onClick={() => setCount(count + 1)}>
          Count: {count}
        </button>
      );
    }`,
    question: "You click the button three times. What value will be logged repeatedly in the console?",
    options: [
      { id: "a", text: "0" },
      { id: "b", text: "1" },
      { id: "c", text: "3" },
      { id: "d", text: "It keeps increasing every second." },
    ],
    correctAnswer: "a",
    hint: `Look carefully at the dependency array of useEffect. Does the interval callback get recreated when count changes?`,
    explanation: `The interval logs 0 repeatedly, even after clicking the button.

    The useEffect has an empty dependency array, so it runs only once after the initial render.

    The interval callback captures the initial value of count, which is 0. This is called a stale closure.

    Although clicking the button updates the state, the existing interval callback continues to reference the initial count value.`,
  },
  {
    id: "debounce-medium",
    title: "Predict the debounce output",
    topic: "Debouncing",
    difficulty: "Medium",
    type: "output",
    code: `
    function debounce(callback, delay) {
      let timer;

      return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
          callback(...args);
        }, delay);
      };
    }

    const search = debounce((value) => {
      console.log(value);
    }, 500);

    search("R");
    search("Re");
    search("Rea");
    search("React");`,
    question: "What will be printed in the console after the calls finish?",
    options: [
      { id: "a", text: "R, Re, Rea, React" },
      { id: "b", text: "React only" },
      { id: "c", text: "R and React" },
      { id: "d", text: "Nothing" },
    ],
    correctAnswer: "b",
    hint: `What happens to the previous timer every time the debounced function is called? Consider the 500ms delay.`,
    explanation: `Only "React" is printed.

    Each call clears the previous timer and starts a new 500ms timer.

    Because all four calls happen one after another, the first three timers are cancelled before they can execute.

    The final call with "React" starts the timer that remains active, so only "React" is logged after 500ms.

    This is the core idea behind debouncing: executing a function only after a specified period of inactivity.`,
  },
];