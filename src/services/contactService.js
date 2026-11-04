/**
 * Contact Service — Aura De-Addiction Center
 *
 * Dedicated data service layer handling retrieval and caching of branch details
 * and contact coordinator information.
 */

const STORAGE_KEY = 'aura_contact_data_v2';

export const contactService = {
  /**
   * Fetch branch locations and contact persons from the API layer.
   *
   * @param {Object} options
   * @param {boolean} [options.bypassCache=false] - When true, forces fresh fetch from endpoint
   * @returns {Promise<{ branches: Array, contactPersons: Array }>}
   */
  async getContactData({ bypassCache = false } = {}) {
    try {
      // 1. Check local storage if not bypassing cache
      if (!bypassCache && typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed?.branches) && Array.isArray(parsed?.contactPersons)) {
              return parsed;
            }
          } catch {
            // Ignore parse error and proceed to network fetch
          }
        }
      }

      // 2. Fetch from the API layer
      const response = await fetch('/api/contact-data.json', {
        headers: {
          Accept: 'application/json',
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch contact details (Status ${response.status})`);
      }

      const data = await response.json();

      // Validate schema
      if (!Array.isArray(data?.branches) || !Array.isArray(data?.contactPersons)) {
        throw new Error('Invalid contact data schema received from server');
      }

      // Filter active entries
      const sanitized = {
        branches: data.branches.filter((b) => b.isActive !== false),
        contactPersons: data.contactPersons.filter((p) => p.isActive !== false),
      };

      // Store in client storage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
        } catch {
          // Local storage quota or security error ignored
        }
      }

      return sanitized;
    } catch (error) {
      console.error('[contactService] Error retrieving contact data:', error);
      throw error;
    }
  },

  /**
   * Clear cached contact data to force a fresh network fetch on next call.
   */
  clearCache() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  },
};

export default contactService;
