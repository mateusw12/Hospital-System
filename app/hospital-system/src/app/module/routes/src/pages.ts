export function loginRegistration() {
  const promise = import('@module/pages/login').then((m) => m.LoginModule);
  return promise;
}

export function information() {
  const promise = import('@module/pages/information').then(
    (m) => m.InformationModule
  );
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

export function disiaseRegistration() {
  const promise = import('@module/pages/disiase-registration').then(
    (m) => m.DisiaseRegistrationModule
  );
  return promise;
}

export function sectorSettingsRegistration() {
  const promise = import('@module/pages/sector-settings').then(
    (m) => m.SectorSettingsRegistrationModule
  );
  return promise;
}

export function medicalProcedureRegistration() {
  const promise = import('@module/pages/medical-procedure-registration').then(
    (m) => m.MedicalProcedureRegistrationModule
  );
  return promise;
}

export function patientRegistration() {
  const promise = import('@module/pages/patient-registration').then(
    (m) => m.PatientRegistrationModule
  );
  return promise;
}

export function doctorAppointmentRegistration() {
  const promise = import('@module/pages/doctor-appointment-registration').then(
    (m) => m.DoctorAppointmentRegistrationModule
  );
  return promise;
}

export function hospitalizationPriceRegistration() {
  const promise = import(
    '@module/pages/hospitalization-price-registration'
  ).then((m) => m.HospitalizationPriceRegistrationModule);
  return promise;
}

export function error404() {
  const promise = import('@module/pages/error-404').then(
    (m) => m.Error404Module
  );
  return promise;
}

export function license() {
  const promise = import('@module/pages/license').then((m) => m.LicenseModule);
  return promise;
}

export function home() {
  const promise = import('@module/pages/home').then((m) => m.HomeModule);
  return promise;
}

export function hospitalizationRegistration() {
  const promise = import('@module/pages/hospitalization-registration').then(
    (m) => m.HospitalizationRegistrationModule
  );
  return promise;
}

export function hospitalizationHistoricRegistration() {
  const promise = import(
    '@module/pages/hospitalization-historic-registration'
  ).then((m) => m.HospitalizationHistoricRegistrationModule);
  return promise;
}

export function news() {
  const promise = import('@module/pages/news').then((m) => m.NewsModule);
  return promise;
}

export function styleSettings() {
  const promise = import('@module/pages/settings').then(
    (m) => m.SettingsModule
  );
  return promise;
}
