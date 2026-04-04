import { describe, it, expect } from 'vitest';
import { validateBrowserControlMode } from '../../src/environments/local/browser/browser-control-validator';
import { ConsoleLogger } from '@tarko/mcp-agent';

describe('Browser Control Validator', () => {
  const logger = new ConsoleLogger('test');

  it('should return requested mode when provider is volcengine', () => {
    const result = validateBrowserControlMode('volcengine', 'hybrid', logger);
    expect(result).toBe('hybrid');
  });

  it('should return requested mode for any provider', () => {
    expect(validateBrowserControlMode('openai', 'hybrid', logger)).toBe('hybrid');
    expect(validateBrowserControlMode('openai', 'visual-grounding', logger)).toBe(
      'visual-grounding',
    );
    expect(validateBrowserControlMode('anthropic', 'hybrid', logger)).toBe('hybrid');
  });

  it('should return requested mode for undefined provider', () => {
    const result = validateBrowserControlMode(undefined, 'visual-grounding', logger);
    expect(result).toBe('visual-grounding');
  });

  it('should return dom mode when explicitly requested', () => {
    const result = validateBrowserControlMode('unknown', 'dom', logger);
    expect(result).toBe('dom');
  });

  it('should default to hybrid mode when no mode is specified', () => {
    const result = validateBrowserControlMode('openai', undefined, logger);
    expect(result).toBe('hybrid');
  });
});
