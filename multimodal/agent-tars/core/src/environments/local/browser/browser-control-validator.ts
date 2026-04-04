/*
 * Copyright (c) 2025 Bytedance, Inc. and its affiliates.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConsoleLogger } from '@tarko/mcp-agent';
import { BrowserControlMode } from '../../../types';

/**
 * Validates the browser control mode based on model provider capabilities
 *
 * @param provider - The model provider name
 * @param requestedMode - The requested browser control mode
 * @param logger - Logger instance for user feedback
 * @returns The browser control mode (defaults to 'hybrid' if not specified)
 */
export function validateBrowserControlMode(
  provider: string | undefined,
  requestedMode: BrowserControlMode | undefined,
  logger: ConsoleLogger,
): BrowserControlMode {
  // Default to hybrid mode if not specified
  const defaultMode: BrowserControlMode = 'hybrid';
  const requestedModeValue = requestedMode || defaultMode;

  return requestedModeValue;
}
