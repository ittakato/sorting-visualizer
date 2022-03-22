import { useState, useEffect } from 'react';

import * as Algorithms from '../Algorithms/Algorithms';

import styles from './Visualizer.module.css';

// Bar Colors
const startColor = '#8295ff';
const endColor = '#44da58';
const pivotColor = '#e2e238';
const compareColor = '#d14747';

// Speeds
const mergeSortSpeed = 5;
const quickSortSpeed = 5;
const heapSortSpeed = 5;
const bubbleSortSpeed = 5;

// Utility Functions
const generateRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const resetArray = (numOfArrays = 100, min = 5, max = 1000) => {
  const array = [];
  for (let i = 0; i < numOfArrays; i++) {
    array.push(generateRandomInt(min, max));
  }
  return array;
};

const colorAllBars = (array, color) => {
  const arrayBars = document.querySelectorAll(`.${styles.array__bar}`);
  arrayBars.forEach(arrayBar => (arrayBar.style.backgroundColor = color));
};

const checkIfSorted = array => {
  let currIdx = 0;
  for (let nextIdx = 1; nextIdx < array.length; nextIdx++) {
    if (array[currIdx] > array[nextIdx]) {
      return false;
    }
    currIdx = nextIdx;
  }
  return true;
};

const testAlgorithms = () => {
  for (let i = 0; i < 100; i++) {
    const array = [];
    const bound = generateRandomInt(1, 1000);
    for (let j = 0; j < bound; j++) {
      array.push(generateRandomInt(-1000, 1000));
    }
    const jsSortedArray = array.slice().sort((a, b) => a - b);

    // Choose sorting algorithm
    const sortedArray = Algorithms.bubbleSort(array);
    // console.log(sortedArray);

    if (JSON.stringify(jsSortedArray) !== JSON.stringify(sortedArray)) {
      console.log(false);
      return;
    }
  }
  console.log(true);
};

const disableButtons = timeout => {
  const buttons = document.querySelectorAll('button');
  const slider = document.querySelector('input[type="range"]');
  buttons.forEach(btn => {
    btn.disabled = true;
    setTimeout(() => {
      btn.disabled = false;
    }, timeout);
  });
  slider.disabled = true;
  setTimeout(() => {
    slider.disabled = false;
  }, timeout);
};

// Sorting Algorithms
const mergeSort = array => {
  if (checkIfSorted(array)) {
    colorAllBars(array, endColor);
    return;
  }

  const animations = Algorithms.mergeSort(array);

  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.querySelectorAll(`.${styles.array__bar}`);
    const isChangeColor = i % 3 !== 2; // change color at idx = 0,1
    if (isChangeColor) {
      const [bar1Idx, bar2Idx, isFinalMerge] = animations[i];
      const bar1Style = arrayBars[bar1Idx].style;
      const bar2Style = arrayBars[bar2Idx].style;
      let color = i % 3 === 0 ? compareColor : startColor;

      setTimeout(() => {
        bar1Style.backgroundColor = color;
        bar2Style.backgroundColor = color;
        if (isFinalMerge) {
          bar1Style.backgroundColor = endColor;
        }
      }, i * mergeSortSpeed);
    } else {
      setTimeout(() => {
        const [barIdx, newHeight, isFinalMerge] = animations[i];
        const barStyle = arrayBars[barIdx].style;
        if (arrayBars[barIdx].innerText) {
          arrayBars[barIdx].innerText = newHeight;
        }
        barStyle.height = `${newHeight * barScale}vh`;
        if (isFinalMerge) {
          barStyle.backgroundColor = endColor;
        }
      }, i * mergeSortSpeed);
    }
  }

  disableButtons(animations.length * mergeSortSpeed);
};

const quickSort = array => {
  if (checkIfSorted(array)) {
    colorAllBars(array, endColor);
    return;
  }

  const animations = Algorithms.quickSort(array);

  let isPivot = false;
  let isRevert = false;
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.querySelectorAll(`.${styles.array__bar}`);

    if (animations[i].length === 1) {
      const pivBarStyle = arrayBars[animations[i][0]].style;

      isPivot = !isPivot;
      if (isPivot) {
        setTimeout(() => {
          pivBarStyle.backgroundColor = pivotColor;
        }, i * quickSortSpeed);
      } else {
        setTimeout(() => {
          pivBarStyle.backgroundColor = endColor;
        }, i * quickSortSpeed);
      }
    } else {
      const [bar1Idx, bar2Idx, isSwapping] = animations[i];
      const bar1Style = arrayBars[bar1Idx].style;
      const bar2Style = arrayBars[bar2Idx].style;

      if (isSwapping && !isRevert) {
        isRevert = true;
        setTimeout(() => {
          [arrayBars[bar1Idx].innerText, arrayBars[bar2Idx].innerText] = [
            arrayBars[bar2Idx].innerText,
            arrayBars[bar1Idx].innerText,
          ];
          [bar1Style.height, bar2Style.height] = [
            bar2Style.height,
            bar1Style.height,
          ];
          bar1Style.backgroundColor = compareColor;
          bar2Style.backgroundColor = compareColor;
        }, i * quickSortSpeed);
      } else if (!isRevert) {
        isRevert = true;
        setTimeout(() => {
          bar1Style.backgroundColor = compareColor;
          bar2Style.backgroundColor = compareColor;
        }, i * quickSortSpeed);
      }

      if (isRevert) {
        isRevert = false;
        setTimeout(() => {
          bar1Style.backgroundColor = startColor;
          bar2Style.backgroundColor = startColor;
        }, i * quickSortSpeed);
      }
    }
  }
  disableButtons(animations.length * quickSortSpeed);
};

const heapSort = array => {
  if (checkIfSorted(array)) {
    colorAllBars(array, endColor);
    return;
  }

  const animations = Algorithms.heapSort(array);

  let isRevert1 = false;
  let isRevert2 = false;

  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.querySelectorAll(`.${styles.array__bar}`);

    const flag = animations[i][0];
    // 0: comparison
    // 1: swap
    // 2: finish

    if (flag === 0) {
      const [_ignore, bar1Idx, bar2Idx, bar3Idx] = animations[i];
      const bar1Style = arrayBars[bar1Idx].style;
      const bar2Style = arrayBars[bar2Idx].style;
      const bar3Style = arrayBars[bar3Idx]?.style;

      if (!isRevert2) {
        isRevert2 = true;
        setTimeout(() => {
          bar1Style.backgroundColor = compareColor;
          bar2Style.backgroundColor = compareColor;
          if (bar3Style) bar3Style.backgroundColor = compareColor;
        }, i * heapSortSpeed);
      } else {
        isRevert2 = false;
        setTimeout(() => {
          bar1Style.backgroundColor = startColor;
          bar2Style.backgroundColor = startColor;
          if (bar3Style) bar3Style.backgroundColor = startColor;
        }, i * heapSortSpeed);
      }
    } else if (flag === 1 || flag === 2) {
      const [_ignore, bar1Idx, bar2Idx] = animations[i];
      const bar1Style = arrayBars[bar1Idx].style;
      const bar2Style = arrayBars[bar2Idx].style;

      if (!isRevert1) {
        isRevert1 = true;
        setTimeout(() => {
          [arrayBars[bar1Idx].innerText, arrayBars[bar2Idx].innerText] = [
            arrayBars[bar2Idx].innerText,
            arrayBars[bar1Idx].innerText,
          ];
          [bar1Style.height, bar2Style.height] = [
            bar2Style.height,
            bar1Style.height,
          ];
          bar1Style.backgroundColor = compareColor;
          bar2Style.backgroundColor = compareColor;
        }, i * heapSortSpeed);
      } else if (isRevert1 && flag === 1) {
        isRevert1 = false;
        setTimeout(() => {
          bar1Style.backgroundColor = startColor;
          bar2Style.backgroundColor = startColor;
        }, i * heapSortSpeed);
      } else if (isRevert1 && flag === 2) {
        isRevert1 = false;
        setTimeout(() => {
          bar1Style.backgroundColor = endColor;
          bar2Style.backgroundColor = endColor;
        }, i * heapSortSpeed);
      }
    }
  }
  disableButtons(animations.length * heapSortSpeed);
};

const bubbleSort = array => {
  if (checkIfSorted(array)) {
    colorAllBars(array, endColor);
    return;
  }

  const animations = Algorithms.bubbleSort(array);

  let isRevert1 = false;
  let isRevert2 = false;

  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.querySelectorAll(`.${styles.array__bar}`);

    const [bar1Idx, bar2Idx, isSwapping] = animations[i];
    const bar1Style = arrayBars[bar1Idx].style;
    const bar2Style = arrayBars[bar2Idx]?.style;

    if (isSwapping && animations.length !== 1) {
      if (!isRevert1) {
        isRevert1 = true;
        setTimeout(() => {
          [arrayBars[bar1Idx].innerText, arrayBars[bar2Idx].innerText] = [
            arrayBars[bar2Idx].innerText,
            arrayBars[bar1Idx].innerText,
          ];
          [bar1Style.height, bar2Style.height] = [
            bar2Style.height,
            bar1Style.height,
          ];
          bar1Style.backgroundColor = compareColor;
          bar2Style.backgroundColor = compareColor;
        }, i * bubbleSortSpeed);
      } else {
        isRevert1 = false;
        setTimeout(() => {
          bar1Style.backgroundColor = startColor;
          bar2Style.backgroundColor = startColor;
        }, i * bubbleSortSpeed);
      }
    } else if (animations[i].length !== 1) {
      if (!isRevert2) {
        isRevert2 = true;
        setTimeout(() => {
          bar1Style.backgroundColor = 'green';
          bar2Style.backgroundColor = 'green';
        }, i * bubbleSortSpeed);
      } else {
        isRevert2 = false;
        setTimeout(() => {
          bar1Style.backgroundColor = startColor;
          bar2Style.backgroundColor = startColor;
        }, i * bubbleSortSpeed);
      }
    }

    if (animations[i].length === 1) {
      setTimeout(() => {
        const barStyle = arrayBars[animations[i][0]].style;
        barStyle.backgroundColor = endColor;
      }, i * bubbleSortSpeed);
    }
  }

  disableButtons(animations.length * bubbleSortSpeed);
};

const barScale = 0.08; // 0.01 = 10vh,
const defaultBarNum = 50;
const viewportWidth = 64;

const Visualizer = () => {
  const [array, setArray] = useState([]);
  const [numOfArrays, setNumOfArrays] = useState(defaultBarNum);
  const [width, setWidth] = useState('');

  const applyBarSettings = (arrayBars, array, width) => {
    arrayBars.forEach((arrayBar, idx) => {
      arrayBar.style.backgroundColor = startColor;
      arrayBar.style.height = `${array[idx] * 0.08}vh`;
      arrayBar.style.width = width;
    });
  };

  useEffect(() => {
    let barWidth = `${viewportWidth / defaultBarNum}vw`;

    const arrayBars = document.querySelectorAll(`.${styles.array__bar}`);
    applyBarSettings(arrayBars, array, barWidth);
  }, []);

  useEffect(() => {
    setArray(resetArray(numOfArrays));

    let barWidth = `${viewportWidth / numOfArrays}vw`;
    setWidth(barWidth);
  }, [numOfArrays]);

  const numOfArraysChangeHandler = event => {
    setNumOfArrays(event.target.value);
    const arrayBars = document.querySelectorAll(`.${styles.array__bar}`);
    applyBarSettings(arrayBars, array, width);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <div className={styles.logo}>Sorting Visualizer</div>
        <button
          onClick={() => {
            setArray(resetArray(numOfArrays));
            const arrayBars = document.querySelectorAll(
              `.${styles.array__bar}`
            );
            applyBarSettings(arrayBars, array, width);
          }}
        >
          Generate New Array
        </button>
        <label htmlFor="size">Number of Arrays:</label>
        <input
          type="range"
          min="2"
          max="170"
          step="2"
          id="size"
          onChange={numOfArraysChangeHandler}
          value={numOfArrays}
        />
        <button onClick={() => bubbleSort(array)}>Bubble Sort</button>
        <button onClick={() => mergeSort(array)}>Merge Sort</button>
        <button onClick={() => quickSort(array)}>Quick Sort</button>
        <button onClick={() => heapSort(array)}>Heap Sort</button>
        {/* <button onClick={() => testAlgorithms()}>Test Algorithms</button> */}
      </div>
      <div className={styles.array}>
        {array.map((value, index) => {
          return (
            <div
              className={styles.array__bar}
              key={index}
              style={{ height: `${value * 0.08}vh` }}
            >
              {numOfArrays <= 22 ? value : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Visualizer;
