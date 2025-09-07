import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LOCAL_STORAGE_KEY = "eventifyStore"; //this should be in .env file

//initial state
const initialState = {
  userInfo: {},
  lang: "en",
  events: [],
  favorites: [],
  event: {},
};

const useAppStore = create(
  persist(
    (set) => ({
      // State
      ...initialState,

      // Actions
      setUserInfo: (userInfo) => set({ userInfo }),
      setLang: (lang) => set({ lang }),
      setEvents: (events) => set({ events }),
      setFavorites: (favorites) => set({ favorites }),
      setCurrentEvent: (event) => set({ event }),

      //Clear Storage
      clearStorage: async () => {
        await AsyncStorage.removeItem(LOCAL_STORAGE_KEY);
        set({ ...initialState });
      },
    }),
    {
      name: LOCAL_STORAGE_KEY,
      storage: {
        getItem: async (key) => {
          const value = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
    }
  )
);

export default useAppStore;
