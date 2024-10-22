import { atom } from "jotai";

// Constants
export const LIMIT = 10;
export const SUPER_ADMIN = "super_admin";
export const STORE_OWNER = "store_owner";
export const STAFF = "staff";
export const TOKEN = "token";
export const PERMISSIONS = "permissions";
export const AUTH_CRED = "AUTH_CRED";
export const EMAIL_VERIFIED = "emailVerified";
export const CART_KEY = "pick-cart";
export const CHECKOUT = "pickbazar-checkout";
export const RESPONSIVE_WIDTH = 1024;
export const MAINTENANCE_DETAILS = "MAINTENANCE_DETAILS";
export const MAXIMUM_WORD_COUNT_FOR_RICH_TEXT_EDITOR = 10000;

export const phoneRegExp =
  /^\+?((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const URLRegExp =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

export const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

// Accepted file types
export const ACCEPTED_FILE_TYPES = {
  "image/jpeg": [],
  "image/png": [],
  "application/pdf": [],
  "application/zip": [],
  "application/vnd.rar": [],
  "application/epub+zip": [],
  ".psd": [],
};

// Jotai atoms
export const searchModalInitialValues = atom(false);
export const miniSidebarInitialValue = atom(false);
export const checkIsMaintenanceModeComing = atom(false);
export const checkIsMaintenanceModeStart = atom(false);
