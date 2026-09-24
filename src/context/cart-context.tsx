"use client";

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { CartItem } from "@/types";

type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; productId: string; sizeLabel: string }
  | { type: "UPDATE_QTY"; productId: string; sizeLabel: string; qty: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

type CartState = {
  items: CartItem[];
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const key = `${action.item.productId}-${action.item.sizeLabel}`;
      const existing = state.items.find(
        (i) => `${i.productId}-${i.sizeLabel}` === key
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            `${i.productId}-${i.sizeLabel}` === key
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case "REMOVE":
      return {
        items: state.items.filter(
          (i) =>
            !(i.productId === action.productId && i.sizeLabel === action.sizeLabel)
        ),
      };
    case "UPDATE_QTY":
      return {
        items: state.items.map((i) =>
          i.productId === action.productId && i.sizeLabel === action.sizeLabel
            ? { ...i, qty: Math.max(0, action.qty) }
            : i
        ).filter((i) => i.qty > 0),
      };
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return { items: action.items };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, sizeLabel: string) => void;
  updateQty: (productId: string, sizeLabel: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("op_cart");
      if (stored) dispatch({ type: "HYDRATE", items: JSON.parse(stored) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("op_cart", JSON.stringify(state.items));
    } catch {}
  }, [state.items]);

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = state.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem: (item) => dispatch({ type: "ADD", item }),
        removeItem: (pid, size) => dispatch({ type: "REMOVE", productId: pid, sizeLabel: size }),
        updateQty: (pid, size, qty) => dispatch({ type: "UPDATE_QTY", productId: pid, sizeLabel: size, qty }),
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
