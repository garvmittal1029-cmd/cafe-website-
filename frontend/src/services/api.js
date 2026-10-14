const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetch menu items from the API.
 */
export async function fetchMenu() {
  try {
    const res = await fetch(`${API_URL}/menu`);
    if (!res.ok) throw new Error('Failed to fetch menu');
    const data = await res.json();
    const rawList = Array.isArray(data) ? data : (data?.items || []);
    if (rawList.length === 0) return null;
    return rawList.map((item) => ({
      name: item.name,
      description: item.description || item.desc || '',
      price: typeof item.price === 'number' ? item.price : (parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0),
      category: item.category,
      image_url: item.image_url || item.image || item.url || '',
    }));
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
    const rawList = Array.isArray(data) ? data : (data?.specials || []);
    if (rawList.length === 0) return null;
    return rawList.map((item) => ({
      name: item.name,
      description: item.description || item.desc || '',
      price: typeof item.price === 'number' ? item.price : (parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0),
      available_until: item.available_until || '6 PM',
      image_url: item.image_url || item.image || item.url || '',
    }));
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
    const rawList = Array.isArray(data) ? data : (data?.images || []);
    if (rawList.length === 0) return null;
    return rawList.map((item) => ({
      image_url: item.image_url || item.url || item.image || '',
      alt_text: item.alt_text || item.alt || 'Gallery photo',
      category: item.category || 'all',
    }));
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
