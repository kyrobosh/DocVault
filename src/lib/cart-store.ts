// src/lib/cart-store.ts
// Global cart state using localStorage + React context

export interface CartItem {
    id: number;
    title: string;
    niche: string;
    icon: string;
    price: number;
    formats: string;
    gumroad: string;
  }
  
  const CART_KEY = "docvault_cart";
  
  export function getCart(): CartItem[] {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
      return [];
    }
  }
  
  export function addToCart(item: CartItem): CartItem[] {
    const cart = getCart();
    if (cart.find(c => c.id === item.id)) return cart;
    const updated = [...cart, item];
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
    return updated;
  }
  
  export function removeFromCart(id: number): CartItem[] {
    const updated = getCart().filter(c => c.id !== id);
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
    return updated;
  }
  
  export function clearCart(): void {
    localStorage.setItem(CART_KEY, "[]");
    window.dispatchEvent(new Event("cart-updated"));
  }
  
  export function getCartTotal(cart: CartItem[]): number {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }