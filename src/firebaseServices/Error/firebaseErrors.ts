export enum EFirebaseErrorCode {
  Unauthorized = "auth/unauthorized",
  NotFound = "storage/object-not-found",
  AddArrayFieldError = "firestore/add-array-field-error",
  NoDocumentToUpdate = "not-found",
  CustomError1 = "your/custom-error-1",
  CustomError2 = "your/custom-error-2",
  PermissionDenied = "permission-denied",
}

export interface FirebaseErrorType {
  code: EFirebaseErrorCode;
  message: string;
}
