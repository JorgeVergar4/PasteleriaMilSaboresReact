// Configuración global para tests con Jest y Jasmine/Karma

// Mock de localStorage - compatible con Jest y Jasmine
const localStorageMock = {
  getItem: typeof jest !== 'undefined' 
    ? jest.fn(() => '[]') 
    : jasmine.createSpy('getItem').and.returnValue('[]'),
  setItem: typeof jest !== 'undefined' 
    ? jest.fn() 
    : jasmine.createSpy('setItem'),
  removeItem: typeof jest !== 'undefined' 
    ? jest.fn() 
    : jasmine.createSpy('removeItem'),
  clear: typeof jest !== 'undefined' 
    ? jest.fn() 
    : jasmine.createSpy('clear'),
  length: 0,
  key: typeof jest !== 'undefined' 
    ? jest.fn() 
    : jasmine.createSpy('key'),
};
global.localStorage = localStorageMock;

// Mock de sessionStorage
const sessionStorageMock = {
  getItem: typeof jest !== 'undefined' 
    ? jest.fn() 
    : jasmine.createSpy('getItem'),
  setItem: typeof jest !== 'undefined' 
    ? jest.fn() 
    : jasmine.createSpy('setItem'),
  removeItem: typeof jest !== 'undefined' 
    ? jest.fn() 
    : jasmine.createSpy('removeItem'),
  clear: typeof jest !== 'undefined' 
    ? jest.fn() 
    : jasmine.createSpy('clear'),
  length: 0,
  key: typeof jest !== 'undefined' 
    ? jest.fn() 
    : jasmine.createSpy('key'),
};
global.sessionStorage = sessionStorageMock;

// Mock de window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: typeof jest !== 'undefined' 
    ? jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    : jasmine.createSpy('matchMedia').and.returnValue({
        matches: false,
        media: '',
        onchange: null,
        addListener: jasmine.createSpy('addListener'),
        removeListener: jasmine.createSpy('removeListener'),
        addEventListener: jasmine.createSpy('addEventListener'),
        removeEventListener: jasmine.createSpy('removeEventListener'),
        dispatchEvent: jasmine.createSpy('dispatchEvent'),
      }),
});

// Mock de ResizeObserver
global.ResizeObserver = typeof jest !== 'undefined' 
  ? jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }))
  : jasmine.createSpy('ResizeObserver').and.returnValue({
      observe: jasmine.createSpy('observe'),
      unobserve: jasmine.createSpy('unobserve'),
      disconnect: jasmine.createSpy('disconnect'),
    });

// Mock de IntersectionObserver
global.IntersectionObserver = typeof jest !== 'undefined' 
  ? jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }))
  : jasmine.createSpy('IntersectionObserver').and.returnValue({
      observe: jasmine.createSpy('observe'),
      unobserve: jasmine.createSpy('unobserve'),
      disconnect: jasmine.createSpy('disconnect'),
    });

// Mock de window.alert
global.alert = typeof jest !== 'undefined' 
  ? jest.fn() 
  : jasmine.createSpy('alert');

// Mock de window.confirm
global.confirm = typeof jest !== 'undefined' 
  ? jest.fn(() => true) 
  : jasmine.createSpy('confirm').and.returnValue(true);

// Mock de window.scrollTo
global.scrollTo = typeof jest !== 'undefined' 
  ? jest.fn() 
  : jasmine.createSpy('scrollTo');

// Mock de URL.createObjectURL
global.URL.createObjectURL = typeof jest !== 'undefined' 
  ? jest.fn(() => 'mocked-url') 
  : jasmine.createSpy('createObjectURL').and.returnValue('mocked-url');

// Mock de URL.revokeObjectURL
global.URL.revokeObjectURL = typeof jest !== 'undefined' 
  ? jest.fn() 
  : jasmine.createSpy('revokeObjectURL');

// Configurar React Router para evitar warnings en tests
if (typeof window !== 'undefined') {
  // Mock de window.history para React Router
  try {
    Object.defineProperty(window, 'history', {
      value: {
        pushState: typeof jest !== 'undefined' ? jest.fn() : jasmine.createSpy('pushState'),
        replaceState: typeof jest !== 'undefined' ? jest.fn() : jasmine.createSpy('replaceState'),
        go: typeof jest !== 'undefined' ? jest.fn() : jasmine.createSpy('go'),
        back: typeof jest !== 'undefined' ? jest.fn() : jasmine.createSpy('back'),
        forward: typeof jest !== 'undefined' ? jest.fn() : jasmine.createSpy('forward'),
        length: 1,
        state: null
      },
      writable: true
    });
  } catch (e) {
    // history property already exists and is not configurable
  }
  
  // Solo intentar mockear window.location en Jest, no en Karma/Jasmine
  if (typeof jest !== 'undefined') {
    try {
      const locationDescriptor = Object.getOwnPropertyDescriptor(window, 'location');
      if (!locationDescriptor || locationDescriptor.configurable) {
        Object.defineProperty(window, 'location', {
          value: {
            href: 'http://localhost/',
            origin: 'http://localhost',
            protocol: 'http:',
            host: 'localhost',
            hostname: 'localhost',
            port: '',
            pathname: '/',
            search: '',
            hash: '',
            assign: jest.fn(),
            replace: jest.fn(),
            reload: jest.fn()
          },
          writable: true,
          configurable: true
        });
      }
    } catch (e) {
      // location property cannot be redefined, skip mocking
    }
  }
}

// Mock de fetch
global.fetch = typeof jest !== 'undefined' 
  ? jest.fn() 
  : jasmine.createSpy('fetch');

// Mock de TextEncoder y TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock de console para evitar ruido en los tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

if (typeof beforeAll !== 'undefined') {
  beforeAll(() => {
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
         args[0].includes('Warning: `ReactDOMTestUtils.act` is deprecated') ||
         args[0].includes('Warning: `ReactDOMTestUtils.act` is deprecated in favor of `React.act`') ||
         args[0].includes('ReactDOMTestUtils.act'))
      ) {
        return;
      }
      originalConsoleError.call(console, ...args);
    };
    
    console.warn = (...args) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('componentWillReceiveProps has been renamed') ||
         args[0].includes('React Router Future Flag Warning'))
      ) {
        return;
      }
      originalConsoleWarn.call(console, ...args);
    };
  });

  afterAll(() => {
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
  });
}

// Limpiar mocks antes de cada test
if (typeof beforeEach !== 'undefined') {
  beforeEach(() => {
    if (typeof jest !== 'undefined') {
      // Jest environment
      jest.clearAllMocks();
      // Reset localStorage mock to default behavior
      global.localStorage.getItem.mockReturnValue('[]');
    } else {
      // Jasmine environment
      localStorageMock.getItem.calls.reset();
      localStorageMock.setItem.calls.reset();
      localStorageMock.removeItem.calls.reset();
      localStorageMock.clear.calls.reset();
      sessionStorageMock.getItem.calls.reset();
      sessionStorageMock.setItem.calls.reset();
      sessionStorageMock.removeItem.calls.reset();
      sessionStorageMock.clear.calls.reset();
      global.alert.calls.reset();
      global.confirm.calls.reset();
      global.fetch.calls.reset();
    }
  });
}
