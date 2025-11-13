
import type { Decision } from '../types';

const API_URL = 'https://yesno.wtf/api';

export async function getDecision(): Promise<Decision> {
  try {
    const response = await fetch(API_URL, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Decision = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch decision:', error);
    throw new Error('Could not get a decision.');
  }
}
