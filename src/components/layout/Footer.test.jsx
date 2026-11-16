import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import Footer from './Footer';
import contactService from '../../services/contactService';

// Mock contactService
vi.mock('../../services/contactService', () => ({
  default: {
    getContactData: vi.fn(),
  },
}));

// Mock useMotionPreference
vi.mock('../../hooks/useMotionPreference', () => ({
  useMotionPreference: () => false,
  default: () => false,
}));

describe('Footer Component', () => {
  const mockBranches = [
    {
      id: 'theni-branch',
      name: 'Theni — Branch',
      address: '128B/W9, Aruna Complex, Koduvilarpatti, Theni – 625534',
      phone: '7418661994',
      displayPhone: '+91 74186 61994',
      directionsUrl: 'https://maps.app.goo.gl/R5tQNixgxB4i5FqW7?g_st=ac',
    },
    {
      id: 'dindigul-branch',
      name: 'Dindigul — Branch',
      address: '54, Ramachandra Nagar, Dindigul – 624003',
      phone: '6380660702',
      displayPhone: '+91 63806 60702',
      directionsUrl: 'https://maps.app.goo.gl/i4vuVctm5zXGbNaP8',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders brand identity section with FOR BETTER LIFE tagline and supporting text', async () => {
    contactService.getContactData.mockResolvedValueOnce({ branches: mockBranches });

    await act(async () => {
      render(<Footer />);
    });

    expect(screen.getByText('Recovery, dignity and a renewed life.')).toBeDefined();
    expect(
      screen.getByText(/Aura De-Addiction Centre is dedicated to compassionate/i)
    ).toBeDefined();
  });

  it('renders all explore navigation links with correct destinations', async () => {
    contactService.getContactData.mockResolvedValueOnce({ branches: mockBranches });

    await act(async () => {
      render(<Footer />);
    });

    expect(screen.getByRole('button', { name: 'Home' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'About Us' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'What We Treat' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Doctors' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Our Services' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Why Choose Us' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Gallery' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Contact' })).toBeDefined();
  });

  it('dynamically loads and renders branch details from contactService', async () => {
    contactService.getContactData.mockResolvedValueOnce({ branches: mockBranches });

    await act(async () => {
      render(<Footer />);
    });

    // Verified branch names
    await waitFor(() => {
      expect(screen.getByText('Theni — Branch')).toBeDefined();
      expect(screen.getByText('Dindigul — Branch')).toBeDefined();
    });

    // Address and map links
    const theniLink = screen.getByRole('link', {
      name: /get directions to theni — branch/i,
    });
    expect(theniLink.getAttribute('href')).toBe('https://maps.app.goo.gl/R5tQNixgxB4i5FqW7?g_st=ac');
    expect(theniLink.getAttribute('target')).toBe('_blank');

    // Phone links with tel: protocol
    const theniPhoneLink = screen.getByRole('link', {
      name: /call theni — branch at \+91 74186 61994/i,
    });
    expect(theniPhoneLink.getAttribute('href')).toBe('tel:7418661994');

    const dindigulPhoneLink = screen.getByRole('link', {
      name: /call dindigul — branch at \+91 63806 60702/i,
    });
    expect(dindigulPhoneLink.getAttribute('href')).toBe('tel:6380660702');
  });

  it('displays graceful fallback when contact data service fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    contactService.getContactData.mockRejectedValueOnce(new Error('Network error'));

    await act(async () => {
      render(<Footer />);
    });

    await waitFor(() => {
      expect(screen.getByText('Contact information temporarily unavailable.')).toBeDefined();
      expect(
        screen.getByRole('link', { name: /call main helpline at 7418661994/i })
      ).toBeDefined();
    });

    consoleSpy.mockRestore();
  });

  it('renders bottom legal bar with dynamic current year and opens Privacy and Terms modals', async () => {
    contactService.getContactData.mockResolvedValueOnce({ branches: mockBranches });

    await act(async () => {
      render(<Footer />);
    });

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear} Aura De-Addiction Centre`, 'i'))
    ).toBeDefined();

    // Click Privacy Policy
    const privacyBtn = screen.getByRole('button', { name: 'Privacy Policy' });
    await act(async () => {
      fireEvent.click(privacyBtn);
    });

    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText('Privacy Policy & Confidentiality')).toBeDefined();
    expect(screen.getByText(/patient privacy and clinical confidentiality/i)).toBeDefined();

    // Close Privacy Modal
    const closeBtn = screen.getByRole('button', { name: 'Close dialog' });
    await act(async () => {
      fireEvent.click(closeBtn);
    });
    expect(screen.queryByRole('dialog')).toBeNull();

    // Click Terms and Conditions
    const termsBtn = screen.getByRole('button', { name: 'Terms and Conditions' });
    await act(async () => {
      fireEvent.click(termsBtn);
    });

    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText('Terms & Conditions of Care')).toBeDefined();
  });

  it('smoothly scrolls to section when Contact navigation link is clicked', async () => {
    contactService.getContactData.mockResolvedValueOnce({ branches: mockBranches });

    const scrollIntoViewMock = vi.fn();
    const mockElement = document.createElement('div');
    mockElement.id = 'contact';
    mockElement.scrollIntoView = scrollIntoViewMock;
    document.body.appendChild(mockElement);

    await act(async () => {
      render(<Footer />);
    });

    const contactNavBtn = screen.getByRole('button', { name: 'Contact' });
    await act(async () => {
      fireEvent.click(contactNavBtn);
    });

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });

    document.body.removeChild(mockElement);
  });

  it('renders Follow Us section with Instagram, Facebook, and YouTube links', async () => {
    contactService.getContactData.mockResolvedValueOnce({ branches: mockBranches });

    await act(async () => {
      render(<Footer />);
    });

    expect(screen.getByText('FOLLOW US')).toBeDefined();

    const igLink = screen.getByRole('link', {
      name: /follow aura de-addiction centre on instagram/i,
    });
    expect(igLink.getAttribute('href')).toBe(
      'https://www.instagram.com/auradeaddictioncentre?srtk=ZndhbXFkNmZzOGJi&utm_source=qr'
    );
    expect(igLink.getAttribute('target')).toBe('_blank');

    const fbLink = screen.getByRole('link', {
      name: /follow aura de-addiction centre on facebook/i,
    });
    expect(fbLink.getAttribute('href')).toBe(
      'https://www.facebook.com/share/1K8zESxg7J/?mibextid=wwXIfr'
    );
    expect(fbLink.getAttribute('target')).toBe('_blank');

    const ytLink = screen.getByRole('link', {
      name: /subscribe to aura de-addiction centre on youtube/i,
    });
    expect(ytLink.getAttribute('href')).toBe(
      'https://youtube.com/@auradeaddictioncentre?si=fns1ebrmv29kcf6o'
    );
    expect(ytLink.getAttribute('target')).toBe('_blank');
  });
});
