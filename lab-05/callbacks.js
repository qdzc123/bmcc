function doTask(taskName, callback) {
    console.log(`Starting task: ${taskName}`);
    setTimeout(() => {
        console.log(`Completed task: ${taskName}`);
        callback();
    }, 1000);
}

// Chaining multiple tasks
doTask('Task 1', () => {
    doTask('Task 2', () => {
        doTask('Task 3', () => {
            console.log('All tasks completed!');
        });
    });
});