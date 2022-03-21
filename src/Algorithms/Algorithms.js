// const merge = (array1, array2) => {
//   let i = 0;
//   let j = 0;

//   const ans = [];

//   while (i < array1.length && j < array2.length) {
//     if (array1[i] < array2[j]) {
//       ans.push(array1[i++]);
//     } else {
//       ans.push(array2[j++]);
//     }
//   }

//   while (i < array1.length) {
//     ans.push(array1[i++]);
//   }
//   while (j < array2.length) {
//     ans.push(array2[j++]);
//   }

//   return ans;
// };

// const mergeSort = (array, animations=  []) => {
//   if (array.length <= 1) return array;

//   const midIdx = Math.floor(array.length / 2);
//   let front = array.slice(0, midIdx);
//   let back = array.slice(midIdx);

//   front = mergeSort(front);
//   back = mergeSort(back);

//   return merge(front, back);
// };

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
	const isFinalMerge =  (animations.length !== 0 && startIdx === 0 && endIdx === mainArray.length - 1);

  while (i <= midIdx && j <= endIdx) {
		animations.push([i,j,isFinalMerge]);
		animations.push([i,j,isFinalMerge]);
    if (auxArray[i] <= auxArray[j]) {
			animations.push([k,auxArray[i],isFinalMerge]);
      mainArray[k++] = auxArray[i++];
    } else {
			animations.push([k,auxArray[j],isFinalMerge]);
      mainArray[k++] = auxArray[j++];
    }
  }

  while (i <= midIdx) {
		animations.push([i,i,isFinalMerge]);
		animations.push([i,i,isFinalMerge]);
		animations.push([k,auxArray[i],isFinalMerge]);
    mainArray[k++] = auxArray[i++];
  }

  while (j <= endIdx) {
		animations.push([j,j,isFinalMerge]);
		animations.push([j,j,isFinalMerge]);
		animations.push([k,auxArray[j],isFinalMerge]);
    mainArray[k++] = auxArray[j++];
  }
};

const quickSort = () => {};

const heapSort = () => {};

const bubbleSort = () => {};

export { mergeSort };
