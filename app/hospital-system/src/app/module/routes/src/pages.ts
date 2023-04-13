export function loginRegistration() {
  const promise = import('@module/pages/login').then((m) => m.LoginModule);
  return promise;
}

export function information() {
  const promise = import('@module/pages/information').then((m) => m.InformationModule);
  return promise;
}

export function userRegistration() {
  const promise = import('@module/pages/user-registration').then(
    (m) => m.UserRegistrationModule
  );
  return promise;
}

export function hospitalRegistration() {
  const promise = import('@module/pages/hospital-registration').then(
    (m) => m.HospitalRegistrationModule
  );
  return promise;
}

export function permissionRegistration() {
  const promise = import('@module/pages/permission-registration').then(
    (m) => m.PermissionRegistrationModule
  );
  return promise;
}

export function itemRegistration() {
  const promise = import('@module/pages/item-registration').then(
    (m) => m.ItemRegistrationModule
  );
  return promise;
}
