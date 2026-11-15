/**
 * Contact Service — Aura De-Addiction Center
 *
 * Dedicated data service layer handling retrieval and caching of branch details
 * and contact coordinator information.
 * Uses a Network-First strategy with automatic cache invalidation and offline fallback.
 */

import { siteConfig } from '../config/siteConfig';

const STORAGE_KEY = 'aura_contact_data_v4';
const LEGACY_STORAGE_KEYS = [
  'aura_contact_data_v1',
  'aura_contact_data_v2',
  'aura_contact_data_v3',
];

// Clean up stale localStorage versions on client initialization
if (typeof window !== 'undefined') {
  try {
    LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  } catch {
    // Local storage access error (e.g. strict privacy mode)
  }
}

// Built-in siteConfig fallback if both network and localStorage are unreachable
const fallbackData = {
  branches: [
    {
      id: 'theni-branch',
      name: siteConfig.contact.theni.name,
      type: siteConfig.contact.theni.type || 'Branch',
      address: siteConfig.contact.theni.address,
      phone: siteConfig.contact.theni.phone,
      displayPhone: '+91 74186 61994',
      directionsUrl: siteConfig.contact.theni.directionsUrl,
      isActive: true,
    },
    {
      id: 'dindigul-branch',
      name: siteConfig.contact.dindigul.name,
      type: siteConfig.contact.dindigul.type || 'Branch',
      address: siteConfig.contact.dindigul.address,
      phone: siteConfig.contact.dindigul.phone,
      displayPhone: '+91 63806 60702',
      directionsUrl: siteConfig.contact.dindigul.directionsUrl,
      isActive: true,
    },
  ],
  contactPersons: [
    {
      id: 'person-1',
      name: siteConfig.contact.coordinators[0]?.name || 'Abishek A',
      phone: siteConfig.contact.coordinators[0]?.phone || '8883130957',
      displayPhone: '+91 88831 30957',
      isActive: true,
    },
    {
      id: 'person-2',
      name: siteConfig.contact.coordinators[1]?.name || 'Amanulla N',
      phone: siteConfig.contact.coordinators[1]?.phone || '9994345448',
      displayPhone: '+91 99943 45448',
      isActive: true,
    },
  ],
};

export const contactService = {
  /**
   * Fetch branch locations and contact persons from the API layer.
   * Uses network-first with cache-busting so updates take effect immediately.
   *
   * @param {Object} options
   * @param {boolean} [options.bypassCache=false] - When true, skips cache read
   * @returns {Promise<{ branches: Array, contactPersons: Array }>}
   */
  async getContactData({ bypassCache = false } = {}) {
    // 1. Try Network-First (always fresh, no stale cache)
    try {
      const url = `/api/contact-data.json?v=${Date.now()}`;
      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (Array.isArray(data?.branches) && Array.isArray(data?.contactPersons)) {
          const sanitized = {
            branches: data.branches.filter((b) => b.isActive !== false),
            contactPersons: data.contactPersons.filter((p) => p.isActive !== false),
          };

          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
            } catch {
              // Storage quota error ignored
            }
          }

          return sanitized;
        }
      }
    } catch (networkError) {
      console.warn('[contactService] Network fetch failed, checking offline cache:', networkError);
    }

    // 2. Offline fallback: Check localStorage if network is offline
    if (!bypassCache && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed?.branches) && Array.isArray(parsed?.contactPersons)) {
            return parsed;
          }
        }
      } catch {
        // Parse error ignored
      }
    }

    // 3. Static fallback: siteConfig
    return fallbackData;
  },

  /**
   * Clear cached contact data to force a fresh network fetch on next call.
   */
  clearCache() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
        LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
      } catch {
        // ignore
      }
    }
  },
};

export default contactService;
