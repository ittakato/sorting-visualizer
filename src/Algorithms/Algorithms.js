const mergeSort = array => {
  const animations = [];
  if (array.length <= 1) return array;
  const auxArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
  return animations;
};

const mergeSortHelper = (mainArray, startIdx, endIdx, auxArray, animations) => {
  if (startIdx === endIdx) return;

  const midIdx = Math.floor(startIdx + (endIdx - startIdx) / 2);
  mergeSortHelper(auxArray, startIdx, midIdx, mainArray, animations);
  mergeSortHelper(auxArray, midIdx + 1, endIdx, mainArray, animations);
  merge(mainArray, startIdx, midIdx, endIdx, auxArray, animations);
};

const merge = (mainArray, startIdx, midIdx, endIdx, auxArray, animations) => {
  let i = startIdx;
  let j = midIdx + 1;
  let k = startIdx;

  // Final Merge
  const isFinalMerge =
    animations.length !== 0 &&
    startIdx === 0 &&
    endIdx === mainArray.length - 1;

  while (i <= midIdx && j <= endIdx) {
    animations.push([i, j, isFinalMerge]);
    animations.push([i, j, isFinalMerge]);
    if (auxArray[i] <= auxArray[j]) {
      animations.push([k, auxArray[i], isFinalMerge]);
      mainArray[k++] = auxArray[i++];
    } else {
      animations.push([k, auxArray[j], isFinalMerge]);
      mainArray[k++] = auxArray[j++];
    }
  }

  while (i <= midIdx) {
    animations.push([i, i, isFinalMerge]);
    animations.push([i, i, isFinalMerge]);
    animations.push([k, auxArray[i], isFinalMerge]);
    mainArray[k++] = auxArray[i++];
  }

  while (j <= endIdx) {
    animations.push([j, j, isFinalMerge]);
    animations.push([j, j, isFinalMerge]);
    animations.push([k, auxArray[j], isFinalMerge]);
    mainArray[k++] = auxArray[j++];
  }
};

const quickSort = array => {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
};

const quickSortHelper = (array, startIdx, endIdx, animations) => {
  if (startIdx <= endIdx) {
    const parIdx = partition(array, startIdx, endIdx, animations);
    quickSortHelper(array, startIdx, parIdx - 1, animations);
    quickSortHelper(array, parIdx + 1, endIdx, animations);
  }
};

const partition = (array, startIdx, endIdx, animations) => {
  const pivot = array[endIdx];
  animations.push([endIdx]); // endIdx is pivot // color this yellow

  let i = startIdx - 1; // color i and j green
  let isSwapping = false;

  for (let j = startIdx; j <= endIdx - 1; j++) {
    isSwapping = false;
    animations.push([i + 1, j, isSwapping]);
    animations.push([i + 1, j, isSwapping]);
    if (array[j] < pivot) {
      i++;
      // color red when swapping
      isSwapping = true;
      animations.push([i, j, isSwapping]);
      isSwapping = false;
      animations.push([i, j, isSwapping]);
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  isSwapping = true;
  animations.push([i + 1, endIdx, isSwapping]);
  [array[i + 1], array[endIdx]] = [array[endIdx], array[i + 1]];

  animations.push([i + 1]); // Index of Pivot // color this purple
  return i + 1;
};

const heapSort = array => {
  const animations = [];

  // Create heap with array
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    // Exclude leaf nodes
    heapifyDown(array, array.length, i, animations);
  }

  for (let i = array.length - 1; i > 0; i--) {
    // color i: green
    animations.push([2, 0, i]); // first param: 0:compare  1:swap  2:finish
    animations.push([2, 0, i]);
    [array[0], array[i]] = [array[i], array[0]];
    heapifyDown(array, i, 0, animations);
  }

  return animations;
};

const heapifyDown = (array, n, rootIdx, animations) => {
  let largestIdx = rootIdx;
  let leftIdx = 2 * rootIdx + 1;
  let rightIdx = 2 * rootIdx + 2;

  // color largestIdx, leftIdx, rightIdx: green
  if (rightIdx < n) {
    animations.push([0, largestIdx, leftIdx, rightIdx]);
    animations.push([0, largestIdx, leftIdx, rightIdx]);
  } else if (leftIdx < n) {
    animations.push([0, largestIdx, leftIdx, -1]);
    animations.push([0, largestIdx, leftIdx, -1]);
  }

  if (leftIdx < n && array[leftIdx] > array[largestIdx]) {
    largestIdx = leftIdx;
  }
  if (rightIdx < n && array[rightIdx] > array[largestIdx]) {
    largestIdx = rightIdx;
  }

  if (largestIdx !== rootIdx) {
    // swapping: color largestIdx, rootIdx, red
    animations.push([1, largestIdx, rootIdx]);
    animations.push([1, largestIdx, rootIdx]);
    // animations.push([largestIdx, rootIdx]);
    [array[rootIdx], array[largestIdx]] = [array[largestIdx], array[rootIdx]];
    heapifyDown(array, n, largestIdx, animations);
  }
};

const bubbleSort = array => {
  const animations = [];

  let i,j;
  let isSwapping = false;
  for (i = 0; i < array.length - 1; i++) {
    for (j = 0; j < array.length - 1 - i; j++) {
      isSwapping = false;
      animations.push([j, j + 1, isSwapping]);
      animations.push([j, j + 1, isSwapping]);

      if (array[j] > array[j + 1]) {
        isSwapping = true;
        animations.push([j, j + 1, isSwapping]);
        animations.push([j, j + 1, isSwapping]);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }

    animations.push([array.length - 1 - i]);
  }
  animations.push([array.length - 1 - i]);

  return animations;
};

export { mergeSort, quickSort, heapSort, bubbleSort };
