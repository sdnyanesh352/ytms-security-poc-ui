import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  private encryptionKey = "encryption-key"

  constructor() {
  }

  getEncryption(plainText: string): any {
    return CryptoJS
      .AES
      .encrypt(plainText, this.encryptionKey)
      .toString();
  }

  getDecryption(encText: string): any {
    return CryptoJS
      .AES
      .decrypt(encText, this.encryptionKey)
      .toString(CryptoJS.enc.Utf8);
  }
}
