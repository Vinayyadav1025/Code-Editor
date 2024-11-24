import { exec } from 'child_process';
import config from '../config/config.js';

const SUPPORTED_LANGUAGES = config.SUPPORTED_LANGUAGES;

export const executeCode = (code, language, input) => {
  return new Promise((resolve, reject) => {
    if (!SUPPORTED_LANGUAGES.includes(language)) {
      return reject(new Error('Unsupported language'));
    }

    // Simulate execution in sandbox (future: replace with Docker or isolated environment)
    const command = `echo "${code}" | ${language} ${input ? `with input: ${input}` : ''}`;
    exec(command, { timeout: config.TIMEOUT }, (error, stdout, stderr) => {
      if (error) {
        return reject(stderr || 'Execution error');
      }
      resolve(stdout.trim());
    });
  });
};

export const runTestCases = async (code, language, testCases) => {
  const results = [];
  for (const { input, expectedOutput } of testCases) {
    const output = await executeCode(code, language, input);
    results.push({
      input,
      output,
      status: output === expectedOutput ? 'Passed' : 'Failed',
    });
  }
  return results;
};
