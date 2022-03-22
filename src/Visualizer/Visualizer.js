import { useState, useEffect } from 'react';

import * as Algorithms from '../Algorithms/Algorithms';

import styles from './Visualizer.module.css';

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

const mergeSort = array => {
  if (checkIfSorted(array)) return;

  const animations = Algorithms.mergeSort(array);

  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.querySelectorAll(`.${styles.array__bar}`);
    const isChangeColor = i % 3 !== 2; // change color at idx = 0,1
    if (isChangeColor) {
      const [bar1Idx, bar2Idx, isFinalMerge] = animations[i];
      const bar1Style = arrayBars[bar1Idx].style;
      const bar2Style = arrayBars[bar2Idx].style;
      let color = i % 3 === 0 ? 'red' : blue;
      setTimeout(() => {
        bar1Style.backgroundColor = color;
        bar2Style.backgroundColor = color;
        if (isFinalMerge) {
          bar1Style.backgroundColor = green;
        }
      }, i * 5);
    } else {
      setTimeout(() => {
        const [barIdx, newHeight, isFinalMerge] = animations[i];
        const barStyle = arrayBars[barIdx].style;
        barStyle.height = `${newHeight * barScale}px`;
        if (isFinalMerge) {
          barStyle.backgroundColor = green;
        }
      }, i * 5);
    }
  }
};

const blue = '#8295ff';
const green = '#2dff49';

const quickSort = array => {
  if (checkIfSorted(array)) return;

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
          pivBarStyle.backgroundColor = 'yellow';
        }, i * 5);
      } else {
        setTimeout(() => {
          pivBarStyle.backgroundColor = green;
        }, i * 5);
      }
    } else {
      const [bar1Idx, bar2Idx, isSwapping] = animations[i];
      const bar1Style = arrayBars[bar1Idx].style;
      const bar2Style = arrayBars[bar2Idx].style;

      if (isSwapping && !isRevert) {
        isRevert = true;
        setTimeout(() => {
          [bar1Style.height, bar2Style.height] = [
            bar2Style.height,
            bar1Style.height,
          ];
          bar1Style.backgroundColor = 'red';
          bar2Style.backgroundColor = 'red';
        }, i * 5);
      } else if (!isRevert) {
        isRevert = true;
        setTimeout(() => {
          bar1Style.backgroundColor = 'red';
          bar2Style.backgroundColor = 'red';
        }, i * 5);
      }

      if (isRevert) {
        isRevert = false;
        setTimeout(() => {
          bar1Style.backgroundColor = blue;
          bar2Style.backgroundColor = blue;
        }, i * 5);
      }
    }
  }
};

const heapSort = array => {
  if (checkIfSorted(array)) return;

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
          bar1Style.backgroundColor = 'red';
          bar2Style.backgroundColor = 'red';
          if (bar3Style) bar3Style.backgroundColor = 'red';
        }, i * 5);
      } else  {
        isRevert2 = false;
        setTimeout(() => {
          bar1Style.backgroundColor = blue;
          bar2Style.backgroundColor = blue;
          if (bar3Style) bar3Style.backgroundColor = blue;
        }, i * 5);
      }
    } 
    
    else if (flag === 1 || flag === 2) {
      const [_ignore, bar1Idx, bar2Idx] = animations[i];
      const bar1Style = arrayBars[bar1Idx].style;
      const bar2Style = arrayBars[bar2Idx].style;

      if (!isRevert1) {
        isRevert1 = true;
        setTimeout(() => {
          [bar1Style.height, bar2Style.height] = [ bar2Style.height, bar1Style.height];
          bar1Style.backgroundColor = 'red';
          bar2Style.backgroundColor = 'red';
        }, i * 5);
      } else if (isRevert1 && flag === 1) {
        isRevert1 = false;
        setTimeout(() => {
          bar1Style.backgroundColor = blue;
          bar2Style.backgroundColor = blue;
        }, i * 5);
      } else if (isRevert1 && flag === 2) {
        isRevert1 = false;
        setTimeout(() => {
          bar1Style.backgroundColor = green;
          bar2Style.backgroundColor = green;
        }, i * 5);
      }
    }
  }
};

const bubbleSort = array => {

  const animations = Algorithms.bubbleSort(array);

  console.log(animations);
  
  let isRevert1 = false;
  let isRevert2 = false;

  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.querySelectorAll(`.${styles.array__bar}`);

    const [bar1Idx, bar2Idx, isSwapping]  = animations[i];
    const bar1Style = arrayBars[bar1Idx].style;
    const bar2Style = arrayBars[bar2Idx]?.style;
    
    if (isSwapping && animations.length !== 1) {

      if (!isRevert1) {
        isRevert1 = true;
        setTimeout(() => {
          [bar1Style.height, bar2Style.height] = [ bar2Style.height, bar1Style.height];
          bar1Style.backgroundColor = 'red';
          bar2Style.backgroundColor = 'red';
        }, i*5);
      } else {
        isRevert1 = false;
        setTimeout(() => {
          bar1Style.backgroundColor = blue;
          bar2Style.backgroundColor = blue;
        }, i*5);
      }
    } 
    
    else if (animations[i].length !== 1) {
      if (!isRevert2) {
        isRevert2 = true;
        setTimeout(() => {
          bar1Style.backgroundColor = 'green';
          bar2Style.backgroundColor = 'green';
        }, i*5);
      } else {
        isRevert2 = false;
        setTimeout(() => {
          bar1Style.backgroundColor = blue;
          bar2Style.backgroundColor = blue;
        }, i*5);
      }
    }


    if (animations[i].length === 1) {
      setTimeout(() => {
        const barStyle = arrayBars[animations[i][0]].style;
        barStyle.backgroundColor = 'purple';
      }, i*5);
    }

    
  }



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
    console.log(sortedArray);

    if (JSON.stringify(jsSortedArray) !== JSON.stringify(sortedArray)) {
      console.log(false);
      return;
    }
  }
  console.log(true);
};

const disableButtons = timeout => {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.disabled = true;
    setTimeout(() => {
      btn.disabled = false;
    }, timeout);
  });
};

const enableButtonDisableFeature = () => {
  const uiButtons = document.querySelector(`.${styles.buttons}`);
  if (uiButtons) {
    uiButtons.addEventListener('click', e => {
      const tgt = e.target;
      if (tgt.previousSibling && tgt.nextSibling) {
        disableButtons(10000);
      }
    });
  }
};

const barScale = 1;

const numOfArrays = 100;

const Visualizer = () => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    setArray(resetArray());
    // enableButtonDisableFeature();
  }, []);

  return (
    <div>
      <div className={styles.array}>
        {array.map((value, index) => {
          return (
            <div
              className={styles.array__bar}
              key={index}
              style={{ height: `${value * barScale}px` }}
            ></div>
          );
        })}
      </div>
      <div className={styles.buttons}>
        <button
          onClick={() => {
            setArray(resetArray(numOfArrays));
            const arrayBars = document.querySelectorAll(
              `.${styles.array__bar}`
            );
            arrayBars.forEach(arraybar => {
              arraybar.style.backgroundColor = '#8295ff';
              let barWidth = 800 / numOfArrays;
              arraybar.style.width = `${barWidth}px`;
            });
          }}
        >
          Generate New Array
        </button>
        <button onClick={() => mergeSort(array)}>Merge Sort</button>
        <button onClick={() => quickSort(array)}>Quick Sort</button>
        <button onClick={() => heapSort(array)}>Heap Sort</button>
        <button onClick={() => bubbleSort(array)}>Bubble Sort</button>
        <button onClick={() => testAlgorithms()}>Test Algorithms</button>
      </div>
    </div>
  );
};

export default Visualizer;
