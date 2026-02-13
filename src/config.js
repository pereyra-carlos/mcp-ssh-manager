/**
 * Runtime limits for MCP responses to avoid context overflows.
 */
export const OUTPUT_LIMITS = {
  DEFAULT_MAX_OUTPUT_LENGTH: parseInt(process.env.MCP_SSH_MAX_OUTPUT_LENGTH || '10000', 10),
  ERROR_MAX_OUTPUT_LENGTH: 1000,
};

/**
 * Timeout configuration in milliseconds.
 */
export const TIMEOUTS = {
  DEFAULT_COMMAND_TIMEOUT: parseInt(process.env.MCP_SSH_DEFAULT_TIMEOUT || '120000', 10),
  MAX_COMMAND_TIMEOUT: 300000,
};

/**
 * Truncate command output while preserving a small tail for context.
 */
export function truncateOutput(text, maxLength = OUTPUT_LIMITS.DEFAULT_MAX_OUTPUT_LENGTH) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  if (text.length <= maxLength) {
    return text;
  }

  const tailLength = Math.min(500, Math.floor(maxLength / 4));
  const headLength = Math.max(0, maxLength - tailLength - 80);

  return (
    text.slice(0, headLength) +
    `\n\n... output truncated (${text.length - maxLength} chars omitted) ...\n\n` +
    text.slice(-tailLength)
  );
}

/**
 * Return compact or pretty JSON based on env preference.
 */
export function formatJSONResponse(payload) {
  const compact = String(process.env.MCP_SSH_COMPACT_JSON || 'false').toLowerCase() === 'true';
  return JSON.stringify(payload, null, compact ? 0 : 2);
}


