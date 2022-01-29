import {AuthService} from "../service/auth/auth.service";

export function authInitializer(authService:AuthService) {
  return () => new Promise(resolve => {
    authService.refreshToken()
      .subscribe()
      .add(resolve);
  });
}
