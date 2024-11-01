export default function bubbleSort(array) {
    // Create a copy of the array to avoid modifying the original
    const auxiliaryArray = [...array];
    const animations = [];
    let n = auxiliaryArray.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Push comparison animation
            animations.push([j, j + 1, false]);
            
            // Compare and swap if needed
            if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
                // Push swap animation
                animations.push([j, j + 1, true]);
                
                // Perform the swap
                [auxiliaryArray[j], auxiliaryArray[j + 1]] = 
                    [auxiliaryArray[j + 1], auxiliaryArray[j]];
            }
        }
    }
    
    console.log("Sorted array:", auxiliaryArray);
    return animations;
}
