namespace jsrsasign.KJUR.jws.JWS {
  type Key = RSAKey | KJUR.crypto.DSA | KJUR.crypto.ECDSA | string;

  export function verifyJWT(
    sJWT: string,
    key?: Key,
    acceptField?: {
      alg?: string[];
      aud?: string[];
      iss?: string[];
      jti?: string;
      sub?: string[];
      verifyAt?: string | number;
    },
  ): boolean;
}
