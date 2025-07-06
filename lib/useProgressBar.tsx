import { create } from 'zustand';

type ProgressState = {
  progress: number;
  loading: boolean;
  start: () => void;
  complete: () => void;
  reset: () => void;
};

export const useProgressStore = create<ProgressState>((set, get) => {
  let incrementTimer: NodeJS.Timeout | null = null;
  let showTimeout: NodeJS.Timeout | null = null;

  return {
    progress: 0,
    loading: false,

    start: () => {
      showTimeout = setTimeout(() => {
        set({ loading: true, progress: 20 });

        incrementTimer = setInterval(() => {
          set((state) => {
            if (state.progress < 90) {
              return { progress: state.progress + Math.random() * 8 }; // random smooth increment
            }
            return state;
          });
        }, 200);
      }, 100);
    },

    complete: () => {
      if (showTimeout) clearTimeout(showTimeout);
      if (incrementTimer) clearInterval(incrementTimer);

      set({loading: false ,progress: 100 });

      setTimeout(() => {
        set({ progress: 0 });
      }, 300);
    },

    reset: () => {
      if (showTimeout) clearTimeout(showTimeout);
      if (incrementTimer) clearInterval(incrementTimer);
      set({ loading: false, progress: 0 });
    },
  };
});
