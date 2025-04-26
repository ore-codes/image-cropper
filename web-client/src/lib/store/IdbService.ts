import { BehaviorSubject } from 'rxjs';
import { get, set, del } from 'idb-keyval';

export class IdbService<T> {
  private subject: BehaviorSubject<T | null>;

  constructor(private key: string) {
    this.subject = new BehaviorSubject<T | null>(null);
    // Initialize the subject with stored value
    this.initializeFromStorage();
  }

  private async initializeFromStorage() {
    try {
      const value = await get(this.key);
      this.subject.next(value || null);
    } catch (error) {
      console.error('Error reading from IndexedDB:', error);
      this.subject.next(null);
    }
  }

  get data$() {
    return this.subject.asObservable();
  }

  async setData(value: T) {
    try {
      await set(this.key, value);
      this.subject.next(value);
    } catch (error) {
      console.error('Error writing to IndexedDB:', error);
    }
  }

  async clear() {
    try {
      await del(this.key);
      this.subject.next(null);
    } catch (error) {
      console.error('Error clearing from IndexedDB:', error);
    }
  }
}
