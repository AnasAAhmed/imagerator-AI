import { create } from 'zustand';

type ProgressState = {
  progress: number;
  loading: boolean;
  start: () => void;
  complete: () => void;
  reset: () => void;
  setProgress: (value: number) => void;
};

export const useProgressStore = create<ProgressState>((set) => ({
  progress: 0,
  loading: false,
  start: () => {
    set({ loading: true, progress: 0 });

    const stepTimeouts = [
      // setTimeout(() => set({ progress: 0 }), 100),
      setTimeout(() => set({ progress: 50 }), 100),
      setTimeout(() => set({ progress: 75 }), 200),
    ];

    // set({ stepTimeouts }); // Optional: store them to cancel later
  },
  complete: () => {
    set({ progress: 100 });

    setTimeout(() => {
      set({ loading: false });
    }, 300); 
  },
  reset: () => {
    set({ loading: false, progress: 0 });
  },
  setProgress: (value: number) => set({ progress: value }),
}));
