export default function selectionSort(array) {
    const auxiliaryArray = [...array];
    const animations = [];
    selectionSortHelper(auxiliaryArray, animations);
    return animations;
}   

function selectionSortHelper(array, animations) {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            animations.push([i, j, false]);
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            animations.push([i, minIndex, true]);
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }
}       