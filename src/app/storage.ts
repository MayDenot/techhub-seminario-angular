import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly _isAvailable: boolean;

  constructor() {
    this._isAvailable = this._checkLocalStorage();
  }

  private _checkLocalStorage(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  getItem(key: string): string | null {
    return this._isAvailable ? localStorage.getItem(key) : null;
  }

  setItem(key: string, value: string): void {
    if (this._isAvailable) {
      localStorage.setItem(key, value);
    }
  }
}
