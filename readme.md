# Simplified Signal Design Pattern Inspired by SolidJS
SolidJS is a reactive UI library that leverages a unique design pattern known as the signal design pattern. This pattern is particularly useful for creating reactive applications with a clean and efficient architecture. In this article, we'll explore a simplified version of SolidJS's signal design pattern using a basic JavaScript implementation.

## Introduction to Signals
In the realm of reactive programming, signals are a powerful concept. They represent a piece of state that can be read and updated, with automatic reactivity built-in. When a signal's value changes, all parts of the code that depend on that signal are automatically updated. This makes it easier to manage state changes and ensure that the UI remains consistent with the underlying data.

## Implementing a Simple Signal System
Let's break down a simple implementation of the signal design pattern. We'll create a PubSub class to handle state management and notifications, and two key functions: createSignal and createEffect.

## The PubSub Class
The PubSub class manages a value and a list of subscribers. When the value changes, all subscribers are notified.

```
class PubSub {
    constructor(value) {
        this.value = value;
        this.subscribers = [];
    }

    getValue() {
        return this.value;
    }

    setValue(newValue) {
        this.value = newValue;
        this.emit();
    }

    emit() {
        this.subscribers.forEach((subscriber) => subscriber(this.value));
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }
}
```

## Creating Signals with createSignal
The createSignal function returns a pair of functions: one to get the value and another to set it. It leverages the PubSub class for managing state and subscribers.
```
let effectCallback = null;

export const createSignal = (value) => {
    const signal = new PubSub(value);

    return [
        function value() {
            if (effectCallback) {
                signal.subscribe(effectCallback);
            }
            return signal.getValue();
        },
        function setValue(newVal) {
            signal.setValue(newVal);
        },
    ];
};
```

## Creating Effects with createEffect
The createEffect function registers a callback that automatically subscribes to any signals it accesses. Whenever these signals change, the effect re-runs.
```
export const createEffect = (callback) => {
    effectCallback = callback;
    callback();
    effectCallback = null;
};
```

# Example Usage
Now, let's see how this implementation can be used in a simple example:
```
import { createSignal, createEffect } from "./signal.js";

const [name, setName] = createSignal("John");
const [age, setAge] = createSignal(24);

// Effects automatically subscribe to signals used within
createEffect(() => {
    console.log(`Name: ${name()}, Age: ${age()}`);
});

const currentAge = age();
setName("John Doe");

for (let i = 0; i < 10; i++) {
    setAge(currentAge + i);
}

```

## Explanation
1. Creating Signals: We create two signals, name and age, initialized with "John" and 24, respectively.
2. Creating an Effect: We define an effect that logs the name and age whenever they change. The createEffect function ensures that the effect subscribes to any signals accessed within it.
3. Updating Signals: We update the name to "John Doe" and increment the age in a loop. Each update triggers the effect, which logs the new values.

# Conclusion
This simplified version of the SolidJS signal design pattern demonstrates the power of reactivity in managing state changes and maintaining a consistent UI. By using signals and effects, you can create a clean and efficient architecture for your reactive applications. This approach can be extended and customized to fit more complex use cases, providing a robust foundation for building modern web applications.

However, it's important to note that this is a basic implementation. SolidJS adds more sophisticated optimizations and features, such as fine-grained reactivity, batch updates, async subscribers, and more. These advanced features make SolidJS highly performant and capable of handling complex state management scenarios efficiently. By understanding the core principles shown here, you can better appreciate the advanced capabilities that SolidJS offers.