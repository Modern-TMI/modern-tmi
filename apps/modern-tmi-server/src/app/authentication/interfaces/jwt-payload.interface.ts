// https://datatracker.ietf.org/doc/html/rfc7519#section-4.1
interface IRegisteredClaims {
  iss?: string; // 토큰 발급자 (issuer)
  sub?: string; // 토큰 제목 (subject)
  aud?: string; // 토큰 대상자 (audience)
  exp?: number; // 토큰 만료 시간 (Expiration Time)
  nbf?: number; // 토큰의 활성 시점 (Not Before). 해당 시점 이전에는 토큰이 처리(process)되지 않음
  iat?: number; // 토큰의 발급 시간 (Issued At)
  jti?: string; // JWT의 고유 식별자. 중복처리 방지를 위해 사용
}
interface IPublicClaims {
  [collisionResistantName: string]: unknown; // https://ldapwiki.com/wiki/Collision-Resistant%20Name
  // collision resistant name은 보통 도메인 네임을 사용한다.
}

interface IPrivateClaims {
  [key: string]: unknown; // 일반 claims
  // key의 충돌 가능성이 있다
}

export interface IJwtPayload
  extends IRegisteredClaims,
    IPublicClaims,
    IPrivateClaims {
  id: number;
}
