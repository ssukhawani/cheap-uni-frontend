import { StorageKeys } from "../constants/storage-keys";

export function getStoredUser() {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const storedUser = localStorage.getItem(StorageKeys.USER);
    return storedUser ? JSON.parse(storedUser) : null;
  }
}

export function setStoredUser(user) {
  if (typeof window !== "undefined") {
    localStorage.setItem(StorageKeys.USER, JSON.stringify(user));
  }
}

export function updateStoredUser(user) {
  let alreadyStoredUser = getStoredUser();
  if (typeof window !== "undefined") {
    localStorage.setItem(
      StorageKeys.USER,
      JSON.stringify({ ...alreadyStoredUser, ...user })
    );
  }
}

export function clearStoredUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(StorageKeys.USER);
  }
}

// Cart
export function getCartItems() {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const storedCart = localStorage.getItem(StorageKeys.CART);
    return storedCart && storedCart.length>0 ? JSON.parse(storedCart) : [];
  }
}

export function setCartItems(itemId) {
  let alreadyStoredCartItems = getCartItems();
  // console.log(alreadyStoredCartItems)
  if (typeof window !== "undefined") {
    localStorage.setItem(
      StorageKeys.CART,
      JSON.stringify([ ...alreadyStoredCartItems, itemId ])
    );
  }
}

export function removeSpecificCartItem(id) {
  let alreadyStoredCartItems = getCartItems();
  const newCart = alreadyStoredCartItems.filter(itemId => itemId != id)
  if (typeof window !== "undefined") {
    localStorage.setItem(
      StorageKeys.CART,
      JSON.stringify(newCart)
    );
  }
}

export function clearCartItems() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(StorageKeys.CART);
  }
}



export function getModal() {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const storedModal = localStorage.getItem(StorageKeys.MODAL);
    return storedModal ? JSON.parse(storedModal) : null;
  }
}

export function setModal(modal) {
  if (typeof window !== "undefined") {
    localStorage.setItem(StorageKeys.MODAL, JSON.stringify(modal));
  }
}

export function updateModal(isCompleted,isOpen) {
  let alreadyStoredModal = getModal();
  if (typeof window !== "undefined") {
    localStorage.setItem(
      StorageKeys.MODAL,
      JSON.stringify({...alreadyStoredModal,isCompleted,isOpen})
    );
  }
}

export function clearModal() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(StorageKeys.MODAL);
  }
}


export function getStoredKey(key) {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const storedKey = localStorage.getItem(StorageKeys[key]);
    return storedKey ? JSON.parse(storedKey) : null;
  }
}

export function setStoredKey(key,value) {
  if (typeof window !== "undefined") {
    localStorage.setItem(StorageKeys[key], JSON.stringify(value));
  }
}