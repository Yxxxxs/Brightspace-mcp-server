/**
 * Brightspace MCP Server
 * Generic SSO flow for any school.
 * Licensed under AGPL-3.0.
 */

import type { Page } from "playwright";
import { log } from "../utils/logger.js";

export class GenericSSOFlow {
  hasCredentials(): boolean {
    return false;
  }

  async login(page: Page): Promise<boolean> {
    return this.manualLogin(page);
  }

  async manualLogin(page: Page): Promise<boolean> {
    try {
      log("INFO", "Starting generic manual login flow");
      log("INFO", "Please log in using the browser window that just opened.");
      log("INFO", "Waiting up to 5 minutes for you to complete login and MFA...");

      await page.waitForURL(/\/d2l\/home/, { timeout: 300000 });
      log("INFO", "Manual login successful - reached Brightspace home");

      return true;
    } catch (error) {
      log("ERROR", "Manual login flow failed or timed out", error);
      return false;
    }
  }
}
