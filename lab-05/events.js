const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// Define an event listener for the 'taskCompleted' event
eventEmitter.on('taskCompleted', (taskName) => {
    console.log(`Listener: ${taskName} has been completed.`);
});

// Emit the event
eventEmitter.emit('taskCompleted', 'Task 1');
