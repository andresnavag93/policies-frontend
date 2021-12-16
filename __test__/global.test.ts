const text = 'Tesis';
const tools = ['React', 'Next', 'Node', 'Javascript'];

describe('Initial tests for understand jest', () => {
  test('It should has the word Tesis', () => {
    expect(text).toMatch(/Tesis/);
  });

  // Test arrays
  test('It should has React', () => {
    expect(tools).toContain('React');
  });

  // Test numbers
  test('It should be greater than', () => {
    expect(10).toBeGreaterThan(9);
  });

  // Test Booleans
  test('It should be true', () => {
    expect(true).toBeTruthy();
  });

  // Reverse strings function with callback
  const reverseString = (str, cb) => {
    cb(str.split('').reverse().join(''));
  };

  // Test callbacks
  test('The callback should return a reversed word', () => {
    reverseString('Tesis', (str) => {
      expect(str).toBe('siseT');
    });
  });

  // Reverse strings function with promise
  const reverseStringPromise = (str) => {
    return new Promise((resolve, reject) => {
      if (!str) {
        reject(Error('There is no string'));
      }
      resolve(str.split('').reverse().join(''));
    });
  };

  // Test promises
  test('The promise should return a reversed word', () => {
    return reverseStringPromise('Tesis').then((str) => {
      expect(str).toBe('siseT');
    });
  });

  // Test async-await
  test('The async-await block code should return a reversed word', async () => {
    const str = await reverseStringPromise('Tesis');
    expect(str).toBe('siseT');
  });
});

// afterEach(() => console.log('After each test'));
// afterAll(() => console.log('All the test ended.'));
// beforeEach(() => console.log('Before each test'));
// beforeAll(() => console.log('Beginning of all the tests'));

export {};
