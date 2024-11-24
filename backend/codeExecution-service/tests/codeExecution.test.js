import { executeCode, runTestCases } from '../src/services/executionService.js';
import { strict as assert } from 'assert';

describe('CodeExecutionService Tests', () => {
  it('should execute valid Python code', async () => {
    const result = await executeCode('print("Hello, World!")', 'python', '');
    assert.equal(result, 'Hello, World!');
  });

  it('should fail on unsupported language', async () => {
    try {
      await executeCode('console.log("Hi")', 'ruby', '');
    } catch (error) {
      assert.equal(error.message, 'Unsupported language');
    }
  });

  it('should pass test cases', async () => {
    const testCases = [
      { input: '1\n2', expectedOutput: '3' },
      { input: '4\n5', expectedOutput: '9' },
    ];
    const results = await runTestCases('x=int(input());y=int(input());print(x+y)', 'python', testCases);
    assert.equal(results[0].status, 'Passed');
    assert.equal(results[1].status, 'Passed');
  });
});
