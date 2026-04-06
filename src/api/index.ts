/**
 * Brightspace MCP Server
 * Original work Copyright (c) 2026 Rohan Muppa. Licensed under AGPL-3.0.
 * Licensed under AGPL-3.0 — see LICENSE file for details.
 */

// D2L API client and infrastructure - Phase 2 public exports

// Main client
export { D2LApiClient } from "./client.js";

// Version discovery
export { discoverVersions } from "./version-discovery.js";

// Cache and rate limiting
export { TTLCache } from "./cache.js";
export { TokenBucket } from "./rate-limiter.js";

// Errors
export { ApiError, RateLimitError, NetworkError } from "./errors.js";

// Types
export type {
  ApiVersions,
  CacheTTLs,
  RateLimitConfig,
  D2LApiClientOptions,
} from "./types.js";
export { DEFAULT_CACHE_TTLS } from "./types.js";
