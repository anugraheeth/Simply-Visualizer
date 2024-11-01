# Sorting Visualizer

A dynamic web application built with React that visualizes sorting algorithms in real-time. Currently featuring Bubble Sort with more algorithms coming soon.

## Live Demo

[Click here to see the live demo](https://anugraheeth.github.io/Simply-Visualizer/)


## 🚀 Features

- Real-time visualization of sorting algorithms
- Adjustable array size (10-40 elements)
- Color-coded visualization states
- Responsive design
- Customizable animation speed

## 🛠️ Technologies Used

- React 18
- Vite
- CSS3
- JavaScript ES6+

## 🎯 Core Components

### Array Generation

```javascript
function generateArray(size) {
const newArray = [];
const maxHeight = Math.min(window.innerHeight 0.4, 180);
const minHeight = 8;
for (let i = 0; i < size; i++) {
newArray.push(Math.floor(Math.random() (maxHeight - minHeight + 1) + minHeight));
}
// ...
}
```

This function generates a random array with heights scaled to the viewport. It ensures:
- Responsive design by adapting to window height
- Minimum bar height of 8px
- Maximum bar height of either 180px or 40% of viewport height

### Bubble Sort Implementation

```javascript
function bubbleSort(array) {
    const auxiliaryArray = [...array];
    const animations = [];
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            animations.push([j, j + 1, false]); // Comparison
            if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
                animations.push([j, j + 1, true]); // Swap
                [auxiliaryArray[j], auxiliaryArray[j + 1]] = 
                    [auxiliaryArray[j + 1], auxiliaryArray[j]];
            }
        }
    }
    return animations;
}
```
The sorting algorithm:
- Creates an animation array to track all comparisons and swaps
- Returns an array of animation tuples in the format: [index1, index2, isSwap]
  - For comparisons: [3, 4, false] means "compare elements at index 3 and 4"
  - For swaps: [3, 4, true] means "swap elements at index 3 and 4"
- Preserves the original array by working on a copy

For example, sorting [5, 2] would generate these animation tuples:
```javascript
[
    [0, 1, false],  // First compare indices 0 and 1 (5 vs 2)
    [0, 1, true]    // Then swap them since 5 > 2
]
```

These tuples are then used by the visualization component to:
1. Change the color of bars during comparison (when isSwap is false)
2. Swap the bars' positions (when isSwap is true)
3. Control the timing and sequence of the animations

### Visualization Logic
```javascript
const visualizeSort = (animations) => {
    animationRef.current = [];
    
    for (let i = 0; i < animations.length; i++) {
        const [barOneIndex, barTwoIndex, isSwap] = animations[i];
        
        animationRef.current.push(setTimeout(() => {
            // Animation logic
        }, i * 100));
    }
}
```
The visualization:
- Uses setTimeout for controlled animation timing
- Manages color changes for comparison and swap states
- Handles cleanup of previous animations
- Provides visual feedback for sorting completion


## 🚦 Getting Started

1. Clone the repository
```bash
git clone https://github.com/anugraheeth/Simply-Visualizer.git
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

## 🔜 Upcoming Features

- Implementation of additional sorting algorithms:
  - Selection Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort
- Adjustable animation speed
- Algorithm complexity information
- Step-by-step explanation mode

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
