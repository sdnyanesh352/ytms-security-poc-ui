import {Injectable} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {EncryptDecryptService} from "./encrypt-decrypt.service";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private encryptService: EncryptDecryptService) {
  }

  decodeToken(token: string): any {
    return jwtDecode(token);
  }

  getFullNameFromToken(token: string): any {
    const decryptedToken = this.encryptService.getDecryption(token);
    const decodedToken = this.decodeToken(decryptedToken);
    if (decodedToken) {
      return decodedToken.fullName;
    }
  }

  getUserNameFromToken(token: string): any {
    const decryptedToken = this.encryptService.getDecryption(token);
    const decodedToken = this.decodeToken(decryptedToken);
    if (decodedToken) {
      return decodedToken.sub;
    }
  }

  getRoleFromToken(token: string): any {
    const decryptedToken = this.encryptService.getDecryption(token);
    const decodedToken = this.decodeToken(decryptedToken);
    if (decodedToken) {
      return decodedToken.roles;
    }
  }
}
