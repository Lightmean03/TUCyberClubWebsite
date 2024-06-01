import { useState } from "react";

export let value: string | null = null;


export const setValue = (newValue: string | null) => {
    value = newValue;
};

export const setItem = (key: any, value: string | null) => {
    localStorage.setItem(key, value);
    setValue(value);
};

export const getItem = (key: any) => {
    const storedValue = localStorage.getItem(key);
    setValue(storedValue);
    return storedValue;
};

export const removeItem = (key: any) => {
    localStorage.removeItem(key);
    setValue(null);
};
