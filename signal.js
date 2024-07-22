// PubSub class to manage a value and notify subscribers when the value changes
class PubSub {
    // Constructor to initialize the value and an empty array for subscribers
    constructor(value) {
        this.value = value;
        this.subscribers = [];
    }

    getValue() {
        return this.value;
    }

    // Method to set a new value and notify subscribers
    setValue(newValue) {
        this.value = newValue;
        this.emit();  // Notify all subscribers about the value change
    }

    // Method to notify all subscribers by calling their callback functions
    emit() {
        this.subscribers.forEach((subscriber) => subscriber(this.value));
    }

    // Method to add a new subscriber callback to the subscribers array
    subscribe(callback) {
        this.subscribers.push(callback);
    }
}

// Global variable to store the current effect callback function
let effectCallback = null;

// Function to create a signal, which is a reactive value
export const createSignal = (value) => {
    const signal = new PubSub(value);   // Create a new PubSub instance with the initial value

    return [
        function value() {
            // If effectCallback is set, it means this value() call is inside an effect
            if (effectCallback) {
                signal.subscribe(effectCallback);   // Register the effect callback to be notified on value changes
            }

            return signal.getValue();
        },
        function setValue(newVal) {
            signal.setValue(newVal);
        },
    ];
};

// Function to create an effect, which reacts to signal changes
export const createEffect = (callback) => {
    effectCallback = callback;  // Set the global effectCallback to the provided callback function

    callback();  // Execute the callback immediately

    effectCallback = null;  // Reset the effectCallback to null after execution
};
