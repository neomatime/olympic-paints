"use client";

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { CartItem } from "@/types";

const CART_STORAGE_KEY = "op_cart_v2";

function lineKey(productId: string, sizeLabel: string, colourId: string): string {
  return `${productId}|${sizeLabel}|${colourId}`;
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.productId === "string" &&
    typeof v.productName === "string" &&
    typeof v.colourId === "string" &&
    typeof v.colourName === "string" &&
    typeof v.sizeLabel === "string" &&
    typeof v.qty === "number" &&
    typeof v.price === "number" &&
    typeof v.image === "string"
  );
}

function parseStoredCart(raw: string): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartItem);
  } catch {
    return [];
  }
}

type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; productId: string; sizeLabel: string; colourId: string }
  | { type: "UPDATE_QTY"; productId: string; sizeLabel: string; colourId: string; qty: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

type CartState = {
  items: CartItem[];
  hydrated: boolean;
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const key = lineKey(action.item.productId, action.item.sizeLabel, action.item.colourId);
      const existing = state.items.find(
        (i) => lineKey(i.productId, i.sizeLabel, i.colourId) === key
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            lineKey(i.productId, i.sizeLabel, i.colourId) === key
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter(
          (i) => lineKey(i.productId, i.sizeLabel, i.colourId) !== lineKey(action.productId, action.sizeLabel, action.colourId)
        ),
      };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items
          .map((i) =>
            lineKey(i.productId, i.sizeLabel, i.colourId) === lineKey(action.productId, action.sizeLabel, action.colourId)
              ? { ...i, qty: Math.max(0, action.qty) }
              : i
          )
          .filter((i) => i.qty > 0),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "HYDRATE":
      return { ...state, items: action.items, hydrated: true };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, sizeLabel: string, colourId: string) => void;
  updateQty: (productId: string, sizeLabel: string, colourId: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], hydrated: false });

  // Read the stored cart exactly once, before any write is allowed. This
  // must run — and finish — before the write effect below fires, so that
  // Strict Mode's double-invoke (mount -> cleanup -> mount) never has a
  // chance to persist an empty cart over a real one.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CART_STORAGE_KEY);
    } catch {}
    dispatch({ type: "HYDRATE", items: stored ? parseStoredCart(stored) : [] });
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch {}
  }, [state.items, state.hydrated]);

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = state.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        hydrated: state.hydrated,
        addItem: (item) => dispatch({ type: "ADD", item }),
        removeItem: (pid, size, colourId) => dispatch({ type: "REMOVE", productId: pid, sizeLabel: size, colourId }),
        updateQty: (pid, size, colourId, qty) =>
          dispatch({ type: "UPDATE_QTY", productId: pid, sizeLabel: size, colourId, qty }),
        clearCart: () => dispatch({ type: "CLEAR" }),
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
