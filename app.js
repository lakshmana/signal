import { createSignal, createEffect } from "./signal.js";

// Create a signal for the name, initialized to "John"
const [name, setName] = createSignal("John");

// Create a signal for the age, initialized to 24
const [age, setAge] = createSignal(24);


// Create an effect that automatically subscribes to the name and age signals
createEffect(() => {
    // This effect runs whenever either the name or age signal changes
    console.log(`Name: ${name()}, Age: ${age()}`);
});


// Get the current value of the age signal
const currentAge = age();

// Change the name signal to "John Doe", triggering the effect
setName("John Doe");

// Loop to increment the age signal 10 times, starting from the current age
for (let i = 0; i < 10; i++) {
    // Update the age signal with the new value, triggering the effect each time
    setAge(currentAge + i ) ;
}