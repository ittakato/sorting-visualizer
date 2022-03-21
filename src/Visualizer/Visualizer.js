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
  const animations = Algorithms.mergeSort(array);

  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.querySelectorAll(`.${styles.array__bar}`);
    const isChangeColor = i % 3 !== 2; // change color at idx = 0,1
    if (isChangeColor) {
      const [bar1Idx, bar2Idx, isFinalMerge] = animations[i];
      const bar1Style = arrayBars[bar1Idx].style;
      const bar2Style = arrayBars[bar2Idx].style;
      let color = i % 3 === 0 ? 'red' : '#8295ff';
      setTimeout(() => {
        bar1Style.backgroundColor = color;
        bar2Style.backgroundColor = color;
        if (isFinalMerge) {
          bar1Style.backgroundColor = '#2dff49';
        }
      }, i * 5);
    } else {
      setTimeout(() => {
        const [barIdx, newHeight, isFinalMerge] = animations[i];
        const barStyle = arrayBars[barIdx].style;
        barStyle.height = `${newHeight * barScale}px`;
        if (isFinalMerge) {
          barStyle.backgroundColor = '#2dff49';
        }
      }, i * 5);
    }
  }
};

const testAlgorithms = () => {
  for (let i = 0; i < 100; i++) {
    const array = [];
    const bound = generateRandomInt(1, 1000);
    for (let j = 0; j < bound; j++) {
      array.push(generateRandomInt(-1000, 1000));
    }
    const jsSortedArray = array.slice().sort((a, b) => a - b);
    const sortedArray = Algorithms.mergeSort(array);

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

const barScale = 0.5;

const numOfArrays = 200;

const Visualizer = () => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    setArray(resetArray());
    const uiButtons = document.querySelector(`.${styles.buttons}`);
    if (uiButtons) {
      uiButtons.addEventListener('click', e => {
        const tgt = e.target;
        if (tgt.previousSibling && tgt.nextSibling) {
          disableButtons(10000);
        }
        console.dir(e.target);
      });
    }
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
        <button>Quick Sort</button>
        <button>Heap Sort</button>
        <button>Bubble Sort</button>
        <button onClick={() => testAlgorithms()}>Test Algorithms</button>
      </div>
    </div>
  );
};

export default Visualizer;
