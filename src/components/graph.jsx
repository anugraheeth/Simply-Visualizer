import React, { useState, useEffect, useRef } from "react";
import "../assets/graph.css";
import bubbleSort from "../algorithms/bubbleSort";
import quickSort from "../algorithms/quickSort";
import selectionSort from "../algorithms/selectionSort";
import insertionSort from "../algorithms/insertionSort";

function Graph() {
    const [array, setArray] = useState([]);
    const [size, setSize] = useState(20);
    const [animations, setAnimations] = useState([]);
    const animationRef = useRef([]);
    const [isSorting, setIsSorting] = useState(false);
    
    function generateArray(size) {
        const newArray = [];
        const bars = document.getElementsByClassName("bar");
        
        const maxHeight = Math.min(window.innerHeight * 0.4, 180);
        const minHeight = 8;

        for (let i = 0; i < size; i++) {
            newArray.push(Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight));
        }

        for (let j = 0; j < bars.length; j++) {
            bars[j].style.backgroundColor = "var(--bar-default)";
        }

        setArray(newArray);
        setAnimations([]);
        clearTimeouts();
    }

    useEffect(() => {
        generateArray(size);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            generateArray(size);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [size]);

    const clearTimeouts = () => {
        if (animationRef.current) {
            animationRef.current.forEach(clearTimeout);
            animationRef.current = null;
        }
    }

    function sortArray() {
        setIsSorting(true);
        const algo = document.getElementById("algo").value;
        let animation;

        if (algo === "bubble") {
            animation = bubbleSort(array);
            if (!Array.isArray(animation)) {
                console.error("Invalid animation returned from sorting algorithm");
                setIsSorting(false);
                return;
            }
        } else if (algo === "quick") {
            animation = quickSort(array);
            if (!Array.isArray(animation)) {
                console.error("Invalid animation returned from sorting algorithm");
                setIsSorting(false);
                return;
            }
        } else if (algo === "selection") {
            animation = selectionSort(array);
            if (!Array.isArray(animation)) {
                console.error("Invalid animation returned from sorting algorithm");
                setIsSorting(false);
                return;
            }
        }else if (algo === "insertion") {
            animation = insertionSort(array);
            if (!Array.isArray(animation)) {
                console.error("Invalid animation returned from sorting algorithm");
                setIsSorting(false);
                return;
            }
        }

        setAnimations(animation);
        visualizeSort(animation);
    }

    const visualizeSort = (animations) => {
        animationRef.current = [];

        for (let i = 0; i < animations.length; i++) {
            const [barOneIndex, barTwoIndex, isSwap] = animations[i];

            animationRef.current.push(setTimeout(() => {
                const bars = document.getElementsByClassName("bar");

                // Reset all bars to default color
                for (let j = 0; j < bars.length; j++) {
                    bars[j].style.backgroundColor = "var(--bar-default)";
                }

                // Color the comparing/swapping bars
                if (isSwap) {
                    bars[barOneIndex].style.backgroundColor = "var(--bar-swapping)";
                    bars[barTwoIndex].style.backgroundColor = "var(--bar-swapping)";
                } else {
                    bars[barOneIndex].style.backgroundColor = "var(--bar-comparing)";
                    if (barTwoIndex !== undefined) {
                        bars[barTwoIndex].style.backgroundColor = "var(--bar-comparing)";
                    }
                }

                // Handle the swap animation
                if (isSwap) {
                    setTimeout(() => {
                        const tempHeight = bars[barOneIndex].style.height;
                        bars[barOneIndex].style.height = bars[barTwoIndex].style.height;
                        bars[barTwoIndex].style.height = tempHeight;
                    }, 100);
                }

                // Final animation handling
                if (i === animations.length - 1) {
                    setTimeout(() => {
                        for (let j = 0; j < bars.length; j++) {
                            bars[j].style.backgroundColor = "var(--accent-finished)";
                        }
                        
                        setTimeout(() => {
                            for (let j = 0; j < bars.length; j++) {
                                bars[j].style.backgroundColor = "var(--bar-default)";
                            }
                            setIsSorting(false);
                            
                            // Add new timeout to reset after bars return to default color
                            setTimeout(() => {
                                generateArray(size);
                            }, 500); // Half second delay after bars return to default
                            
                        }, 3000);
                    }, 100);
                }
            }, i * 100));
        }
    }

    const handleStop = () => {
        clearTimeouts();
        setIsSorting(false);
        generateArray(size);
    }

    return (
        <div>
            <div className="controls-container">
                <h1>Simply Sorting Visualizer</h1>
                <div className="controls-group">
                    <div className="range-container">
                        <div className="range-labels">
                            <span>Array Size</span>
                        </div>
                        <input 
                            type="range" 
                            min="20"
                            max="40" 
                            onChange={(e) => generateArray(parseInt(e.target.value))} 
                            defaultValue="20"
                            disabled={isSorting} 
                        />
                    </div>
                    <select name="algorithm" id="algo" disabled={isSorting}>
                        <option value="bubble">Bubble Sort</option>
                        <option value="selection">Selection Sort</option>
                        <option value="insertion">Insertion Sort</option>
                        <option value="merge">Merge Sort</option>
                        <option value="quick">Quick Sort</option>
                    </select>
                </div>
                <div className="controls-group">
                    <button 
                        onClick={() => sortArray()} 
                        disabled={isSorting}
                    >
                        Sort
                    </button>
                    <button 
                        onClick={() => isSorting ? handleStop() : generateArray(size)}
                    >
                        {isSorting ? 'Stop' : 'Reset'}
                    </button>
                </div>
                <p className="note">Note: Currently Merge Sort  is not functioning.  Will be added soon.</p>
            </div>
            <div className="section-container">
                <div className="graph">
                    {array.map((value, index) => (
                        <div 
                            key={index} 
                            style={{
                                height: `${value}px`,
                                backgroundColor: "var(--bar-default)",
                            }} 
                            className="bar"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Graph;
