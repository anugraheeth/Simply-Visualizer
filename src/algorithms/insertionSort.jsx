export default function insertionSort(array) {
    const auxiliaryArray = [...array];
    const animations = [];
    insertionSortHelper(auxiliaryArray, animations);
    return animations;
}   

function insertionSortHelper(array, animations) {
    for (let i = 1; i < array.length; i++) {
        let current = array[i];
        let j = i - 1;

        animations.push([i, j, false]);

        while (j >= 0 && array[j] > current) {
            animations.push([j + 1, j, true]);
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = current;
    }
}
