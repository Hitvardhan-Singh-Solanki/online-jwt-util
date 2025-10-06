import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CopyButton } from '../components/CopyButton';
import { JsonEditor } from '../components/JsonEditor';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
  },
});

describe('CopyButton', () => {
  it('should render with default label', () => {
    render(<CopyButton text="test content" />);
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('should show "Copied!" after clicking', async () => {
    render(<CopyButton text="test content" />);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });

  it('should call clipboard API with correct text', async () => {
    const testText = 'test content to copy';
    render(<CopyButton text={testText} />);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testText);
  });
});

describe('JsonEditor', () => {
  it('should display JSON value', () => {
    const value = { test: 'data', number: 123 };
    render(<JsonEditor value={value} readOnly />);

    expect(screen.getByDisplayValue(/"test": "data"/)).toBeInTheDocument();
  });

  it('should call onChange when valid JSON is entered', async () => {
    const onChange = vi.fn();
    const initialValue = { test: 'old' };

    render(<JsonEditor value={initialValue} onChange={onChange} />);

    const textarea = screen.getByRole('textbox');
    const newValue = { test: 'new' };

    await userEvent.clear(textarea);
    await userEvent.type(textarea, JSON.stringify(newValue, null, 2));

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(newValue);
    });
  });

  it('should show error for invalid JSON', async () => {
    const onChange = vi.fn();

    render(<JsonEditor value={{}} onChange={onChange} />);

    const textarea = screen.getByRole('textbox');

    await userEvent.clear(textarea);
    await userEvent.type(textarea, '{invalid json}');

    await waitFor(() => {
      expect(screen.getByText(/Invalid JSON/)).toBeInTheDocument();
    });
  });

  it('should not call onChange when readOnly', async () => {
    const onChange = vi.fn();

    render(<JsonEditor value={{ test: 'data' }} onChange={onChange} readOnly />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('readonly');
  });
});
