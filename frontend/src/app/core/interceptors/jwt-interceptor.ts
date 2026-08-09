import { HttpInterceptorFn } from '@angular/common/http';


export const jwtInterceptor: HttpInterceptorFn = (req, next) => {


  // Don't add token to login/register
  if (
    req.url.includes('/api/auth/login') ||
    req.url.includes('/api/auth/register')
  ) {
    return next(req);
  }


  const userStr = localStorage.getItem('user');


  if(userStr){

    const user = JSON.parse(userStr);


    if(user.token){

      const clonedRequest = req.clone({

        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }

      });


      return next(clonedRequest);

    }

  }


  return next(req);

};