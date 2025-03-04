function doTask(taskName) {
    return new Promise((resolve, reject) => {
        console.log(`Starting task: ${taskName}`);
        setTimeout(() => {
            if (taskName === 'Task 2') {
                reject('Error: Something went wrong with Task 2!');
            } else {
                console.log(`Completed task: ${taskName}`);
                resolve();
            }
        }, 1000);
    });
}

// Handling errors with .catch()
doTask('Task 1')
    .then(() => doTask('Task 2'))
    .then(() => doTask('Task 3'))
    .then(() => {
        console.log('All tasks completed!');
    })
    .catch((error) => {
        console.error(error);
    });
