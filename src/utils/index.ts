import { useEffect, useState } from "react";

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''
// 设置对象类型为键值对而不是object来表示对象类型
export const cleanObject = (object: { [key: string]: unknown }) => {
  // 这里的result是空对象，因为这里的object类型不是我们理解的对象类型，它可以表示对象，函数或正则表达式。所以对其解构是没有意义的，返回空对象。
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

// 抽象页面加载时的useEffect,hook要在其他hook或者组件中运行，而不能在普通函数中运行，所以一定要以use开头（hook）
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);
};
// debounce专门用来监听快速的事件，无论是鼠标，keyboard，还是改变窗口的事件
// 原理：只要你是连续执行的，最后都只剩一个定时任务
// const debounce = (func, delay) => {
//     let timeout;
//     return () => {
//         if (timeout) {
//             clearTimeout(timeout)
//         }
//         timeout = setTimeout(function () {
//             func()
//         }, delay)
//     }
// }
// const log = debounce(() => console.log('call'), 5000)
// log()
// log()
// log()
//闭包，每次调用 debounce 返回的函数时，都在同一作用域中使用同一个 timeout 变量。这导致了三次调用返回的函数共享相同的 timeout，因此后两次调用会清除前一次的计时器，从而重新计时。
// 运行了3次却只打印了一个call，因为执行的三次log是同时执行的，但是要5s之后才会输出，前两次还没来得及执行输出就被后面的清除了，只运行了最后一次的输出

// 将value转成debouncedValue，并不能直接转换而是需要定义状态（响应式），必须用到hook，所以不能写成普通函数
// 而上面的cleanObject不需要使用到任何hook就能转换，所以建议使用函数
export const useDebounce = <V>(value: V, delay?: number) => {
  // useState就使用的泛型，传入的啥类型，返回啥类型。这里传入V的value，返回V的debouncedValue
  const [debouncedValue, setDebouncedValue] = useState(value);
  // 只在value和delay变化时才执行
  useEffect(() => {
    // 每次在value变化之后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 上一次useEffect运行完之后执行清理上一次定时器
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};
