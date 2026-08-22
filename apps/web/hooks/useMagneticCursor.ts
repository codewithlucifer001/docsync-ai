"use client";

import { create } from "zustand";

export type CursorVariant = "default" | "magnetic" | "text" | "glow" | "hidden";

interface CursorStore {
  variant: CursorVariant;
  cursorText: string;
  setVariant: (variant: CursorVariant, text?: string) => void;
  resetVariant: () => void;
}

export const useCursorStore = create<CursorStore>((set) => ({
  variant: "default",
  cursorText: "",
  setVariant: (variant, text = "") => set({ variant, cursorText: text }),
  resetVariant: () => set({ variant: "default", cursorText: "" })
}));
