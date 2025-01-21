import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App component tests', () => {
  test('renders upload button correctly', () => {
    render(<App />);
    expect(screen.getByText('Upload to S3')).toBeInTheDocument();
  });

  test('file selection updates the state', () => {
    render(<App />);
    
    // Simulate file input
    const fileInput = screen.getByTestId('file-input');
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Check if the "File selected:" log is in the console
    // This assertion is more about demonstrating state change and event handling
    // Console log checks are not typically done in testing, consider changing the implementation for better testability
    expect(console.log).toHaveBeenCalledWith('File selected:', file);
  });

  // Add more tests as needed
});

// Mock global console to test console output (optional)
beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  console.log.mockRestore();
});
