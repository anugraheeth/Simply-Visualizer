export default function mergeSort(array) {
    const auxiliaryArray = [...array];
    const animations = [];
    mergeSortHelper(array, auxiliaryArray, 0, array.length - 1, animations);
    return animations;
}

function mergeSortHelper(mainArray, auxiliaryArray, startIdx, endIdx, animations) {
    if (startIdx === endIdx) return;
    
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    
    // Recursively divide the array into halves
    mergeSortHelper(auxiliaryArray, mainArray, startIdx, middleIdx, animations);
    mergeSortHelper(auxiliaryArray, mainArray, middleIdx + 1, endIdx, animations);
    
    // Merge the sorted halves
    merge(mainArray, auxiliaryArray, startIdx, middleIdx, endIdx, animations);
}

function merge(mainArray, auxiliaryArray, startIdx, middleIdx, endIdx, animations) {
    let i = startIdx;
    let j = middleIdx + 1;
    let k = startIdx;
    
    while (i <= middleIdx && j <= endIdx) {
        // Animation to compare elements at indices i and j
        animations.push([i, j, false]);
        
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // Animation to overwrite element at k with auxiliaryArray[i]
            animations.push([k, auxiliaryArray[i], true]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // Animation to overwrite element at k with auxiliaryArray[j]
            animations.push([k, auxiliaryArray[j], true]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    
    while (i <= middleIdx) {
        // Animation to overwrite element at k with auxiliaryArray[i]
        animations.push([k, auxiliaryArray[i], true]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    
    while (j <= endIdx) {
        // Animation to overwrite element at k with auxiliaryArray[j]
        animations.push([k, auxiliaryArray[j], true]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}
