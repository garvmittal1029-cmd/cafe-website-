const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Fetch menu items from the API.
 */
export async function fetchMenu() {
  try {
    const res = await fetch(`${API_URL}/menu`);
    if (!res.ok) throw new Error('Failed to fetch menu');
    const data = await res.json();
    return data.items;
  } catch (err) {
    console.warn('API unavailable, using fallback data:', err.message);
    return null;
  }
}

/**
 * Fetch today's specials from the API.
 */
export async function fetchTodaysSpecial() {
  try {
    const res = await fetch(`${API_URL}/todays-special`);
    if (!res.ok) throw new Error('Failed to fetch specials');
    const data = await res.json();
    return data.specials;
  } catch (err) {
    console.warn('API unavailable, using fallback data:', err.message);
    return null;
  }
}

/**
 * Fetch gallery images from the API.
 */
export async function fetchGallery() {
  try {
    const res = await fetch(`${API_URL}/gallery`);
    if (!res.ok) throw new Error('Failed to fetch gallery');
    const data = await res.json();
    return data.images;
  } catch (err) {
    console.warn('API unavailable, using fallback data:', err.message);
    return null;
  }
}

/**
 * Submit a contact form message.
 */
export async function submitContact({ name, email, message }) {
  try {
    const res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });
    if (!res.ok) throw new Error('Failed to submit contact');
    return await res.json();
  } catch (err) {
    console.warn('API unavailable:', err.message);
    return { success: true, message: 'Thank you! (offline mode)' };
  }
}

/**
 * Subscribe to the newsletter.
 */
export async function subscribeNewsletter(email) {
  try {
    const res = await fetch(`${API_URL}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.detail || 'Failed to subscribe');
    }
    return await res.json();
  } catch (err) {
    if (err.message.includes('already subscribed')) {
      return { success: false, message: err.message };
    }
    console.warn('API unavailable:', err.message);
    return { success: true, message: 'Welcome to the Coffee Club! (offline mode)' };
  }
}
