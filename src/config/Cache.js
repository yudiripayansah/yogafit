import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'cache::';

const Cache = {
  async get(key, {allowStale = false} = {}) {
    try {
      const raw = await AsyncStorage.getItem(PREFIX + key);
      if (!raw) return null;
      const {data, expiry} = JSON.parse(raw);
      const isStale = Date.now() > expiry;
      if (isStale && !allowStale) {
        AsyncStorage.removeItem(PREFIX + key).catch(() => {});
        return null;
      }
      return {data, isStale};
    } catch {
      return null;
    }
  },

  async set(key, data, ttlMs) {
    try {
      await AsyncStorage.setItem(
        PREFIX + key,
        JSON.stringify({data, expiry: Date.now() + ttlMs}),
      );
    } catch {}
  },

  async remove(key) {
    try {
      await AsyncStorage.removeItem(PREFIX + key);
    } catch {}
  },
};

export const TTL = {
  MIN_5: 5 * 60 * 1000,
  MIN_15: 15 * 60 * 1000,
  MIN_30: 30 * 60 * 1000,
  HOUR_1: 60 * 60 * 1000,
};

export default Cache;
