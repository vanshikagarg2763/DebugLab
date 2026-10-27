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
    code: `// Add JavaScript code here`,
    question: "What would be the output of this code?",
    options: [
      { id: "a", text: "Option one" },
      { id: "b", text: "Option two" },
      { id: "c", text: "Option three" },
      { id: "d", text: "Option four" },
    ],
    correctAnswer: "a",
    hint: "Add a useful hint here.",
    explanation: "Explain why the selected answer is correct.",
  },
  {
    id: "reactState-medium",
    title: "Predict the React state update",
    topic: "React State Updates",
    difficulty: "Medium",
    type: "output",
    code: `// Add JavaScript code here`,
    question: "What will this code print?",
    options: [
      { id: "a", text: "Option one" },
      { id: "b", text: "Option two" },
      { id: "c", text: "Option three" },
      { id: "d", text: "Option four" },
    ],
    correctAnswer: "a",
    hint: "Add a useful hint here.",
    explanation: "Explain why the selected answer is correct.",
  },
];