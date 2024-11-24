import { exec } from 'child_process';

// Simulated runner (future: replace with isolated Docker environment)
export const runCode = (command, input) => {
  return new Promise((resolve, reject) => {
    exec(command, { input }, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || 'Execution error');
      } else {
        resolve(stdout.trim());
      }
    });
  });
};
