import '@testing-library/jest-dom';

// Mock TextEncoder
global.TextEncoder = require('util').TextEncoder;