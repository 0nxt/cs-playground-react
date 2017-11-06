export default
`// MERGESORT / MERGE
function mergeSort(arr) {
    if (arr.length < 2) {
        return arr;
    }

    var left = arr.slice(0, arr.length/2);
    var right = arr.slice(arr.length/2);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var results = [],
        il = 0,
        ir = 0;

    while (il < left.length && ir < right.length) {
        if (left[il] <= right[ir]) {
            results.push(left[il++]);
        } else {
            results.push(right[ir++]);
        }
    }

    return results.concat(left.slice(il), right.slice(ir));
}



// QUICKSORT / PARTITION
function quickSort(arr, low = 0, high = arr.length-1) {

    if (arr.length > 1) {

        var index = partition(arr, low, high);

        if (low < index - 1) {
            quickSort(arr, low, index-1);
        }

        if (high > index) {
            quickSort(arr, index, high);
        }
    }

    return arr;
}

function partition(arr, low, high) {
    var pivot = arr[Math.floor((low+high)/2)],
        i = low,
        j = high;

    while (i <= j) {

        while (arr[i] < pivot) {
            i++;
        }

        while (arr[j] > pivot) {
            j--;
        }

        if (i <= j) {
            swap(arr, i, j);
            j--;
            i++;
        }

    }

    return i;
}



// BUBBLE SORT
function bubbleSort(arr) {
    var swapped = true;

    while (swapped) {
        swapped = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > arr[i+1]) {
                swap(arr, i, i+1);
                swapped = true;
            }
        }
    }

    return arr;
}



// SELECTION SORT
function selectionSort(arr) {
    var pointer = 0;
    while (pointer < arr.length) {
        var min = arr[pointer], swapIdx;
        for (var i = pointer; i < arr.length; i++) {
            if (arr[i] <= min) {
                min = arr[i];
                swapIdx = i;
            }
        }

        swap(arr, pointer, swapIdx);
        pointer++;
    }

    return arr;
}



// INSERTION SORT
function insertionSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        var j = i+1;
        while (arr[j] < arr[j-1]) {
            swap(arr, j, j-1);
            j--;
        }
    }

    return arr;
}



// HEAP SORT
class MinHeap {
    constructor() {
        this.heap = [];
        this.length = 0;
    }


    insert(node) {
        this.heap.push(node);
        this.length++;

        var swap = (node, nodeIdx) => {

            var parentIdx = Math.floor((nodeIdx - 1) / 2);
            var parent = this.heap[parentIdx];

            if (parent > node) {
                this.heap[parentIdx] = node;
                this.heap[nodeIdx] = parent;
                swap(node, parentIdx);
            }
        };

        if (this.length > 1) {
            return swap(node, this.length-1);
        }
    }


    remove() {
        if (!this.size) {
            return null;
        }

        var min = this.heap.shift();

        if (this.size > 1) {
            this.heap.unshift(this.heap.pop());
        }

        var swap = (node, nodeIdx = 0) => {
            var childIdx;
            if (this.size === 2) {
                childIdx = 1;
            } else if (this.heap[2 * nodeIdx + 1] < this.heap[2 * nodeIdx + 2]) {
                childIdx = 2 * nodeIdx + 1;
            } else {
                childIdx = 2 * nodeIdx + 2;
            }

            if (node > this.heap[childIdx]) {
                this.heap[nodeIdx] = this.heap[childIdx];
                this.heap[childIdx] = node;
                return swap(node, childIdx);
            }

            this.length--;
            return min;

        };

        return swap(this.heap[0]);
    }


    sort(arr) {
        var sorted = [];

        for (var i = 0; i < arr.length; i++) {
            this.insert(arr[i]);
        }

        while (this.size) {
            sorted.push(this.remove());
        }

        return sorted;
    }


    get size() {
        return this.length;
    }
}



// UTILITY FUNCTIONS:


// swaps array items
function swap(arr, a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}


// generate randomly 5000 item array
const BENCHED_ARRAY = (function randomizeArray(n) {
    var arr = [];

    while (arr.length < n) {
        arr.push(Math.floor(Math.random() * n + 1));
    }

    return arr;
})(5000);


// parseTime utility
function parseTime(start, end) {
    return parseInt(end - start).toString() + 'ms';
}

// BENCHMARKS:

{
    let start = window.performance.now();
    mergeSort([...BENCHED_ARRAY]);
    let end = window.performance.now();
    console.log('Mergesort: ' + parseTime(start, end)); // ~10ms
}{
    let start = window.performance.now();
    quickSort([...BENCHED_ARRAY]);
    let end = window.performance.now();
    console.log('Quicksort: ' + parseTime(start, end)); // ~5ms
}{
    let start = window.performance.now();
    bubbleSort([...BENCHED_ARRAY]);
    let end = window.performance.now();
    console.log('Bubble Sort: ' + parseTime(start, end)); // ~325ms
}{
    let start = window.performance.now();
    selectionSort([...BENCHED_ARRAY]);
    let end = window.performance.now();
    console.log('Selection Sort: ' + parseTime(start, end)); // ~20ms
}{
    let start = window.performance.now();
    insertionSort([...BENCHED_ARRAY]);
    let end = window.performance.now();
    console.log('Insertion Sort: ' + parseTime(start, end)); // ~120ms
}{
    const heap = new MinHeap();
    let start = window.performance.now();
    heap.sort([...BENCHED_ARRAY]);
    let end = window.performance.now();
    console.log('Heap Sort: ' + parseTime(start, end)); // ~13ms
}{
    // Array.sort is implemented w/ a highly optimized merge sort in most engines
    let start = window.performance.now();
    [...BENCHED_ARRAY].sort((a, b) => a > b);
    let end = window.performance.now();
    console.log('Array.sort: ' + parseTime(start, end)); // ~2ms WOW!!!
}
`;
