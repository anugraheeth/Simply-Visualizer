export default function quickSort(array) {
    const auxiliaryArray = [...array];
    const animations = [];
    quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
    return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
    if (startIdx < endIdx) {
        const pivotIdx = partition(array, startIdx, endIdx, animations);
        quickSortHelper(array, startIdx, pivotIdx - 1, animations);
        quickSortHelper(array, pivotIdx + 1, endIdx, animations);
    }
}

function partition(array, startIdx, endIdx, animations) {
    const pivotValue = array[endIdx];
    let pivotIdx = startIdx;
    for (let i = startIdx; i < endIdx; i++) {
        animations.push([i, endIdx, false]);
        if (array[i] < pivotValue) {
            if (i !== pivotIdx) {
                animations.push([i, pivotIdx, true]);
                [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
            }
            pivotIdx++;
        }
    }
    if (pivotIdx !== endIdx) {
        animations.push([pivotIdx, endIdx, true]);
        [array[pivotIdx], array[endIdx]] = [array[endIdx], array[pivotIdx]];
    }
    return pivotIdx;
}