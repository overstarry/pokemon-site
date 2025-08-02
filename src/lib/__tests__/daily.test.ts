/**
 * Tests for daily Pokemon utility functions
 */

import { getDailyPokemonId, getCurrentDateString } from '../daily';

describe('Daily Pokemon utilities', () => {
  describe('getDailyPokemonId', () => {
    it('should return consistent Pokemon ID for same user and date', () => {
      const userId = 'test-user-123';
      const dateString = '2024-01-01';
      
      const id1 = getDailyPokemonId(userId, dateString);
      const id2 = getDailyPokemonId(userId, dateString);
      
      expect(id1).toBe(id2);
    });

    it('should return different Pokemon IDs for different users on same date', () => {
      const dateString = '2024-01-01';
      const userId1 = 'user-1';
      const userId2 = 'user-2';
      
      const id1 = getDailyPokemonId(userId1, dateString);
      const id2 = getDailyPokemonId(userId2, dateString);
      
      expect(id1).not.toBe(id2);
    });

    it('should return different Pokemon IDs for same user on different dates', () => {
      const userId = 'test-user-123';
      const date1 = '2024-01-01';
      const date2 = '2024-01-02';
      
      const id1 = getDailyPokemonId(userId, date1);
      const id2 = getDailyPokemonId(userId, date2);
      
      expect(id1).not.toBe(id2);
    });

    it('should return Pokemon ID within valid range (1-1010)', () => {
      const userId = 'test-user-123';
      const dateString = '2024-01-01';
      
      const id = getDailyPokemonId(userId, dateString);
      
      expect(id).toBeGreaterThanOrEqual(1);
      expect(id).toBeLessThanOrEqual(1010);
    });
  });

  describe('getCurrentDateString', () => {
    it('should return date in YYYY-MM-DD format', () => {
      const dateString = getCurrentDateString();
      
      expect(dateString).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});
