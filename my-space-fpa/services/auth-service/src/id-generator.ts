export enum UserRole {
  FREELANCER = 'F',
  CLIENT = 'C',
  ENTERPRISE = 'E',
  AGENCY = 'A',
}

/**
 * MSF Unique Identification System
 * Format: MSF + 8-digit random number + Role Code
 * Example: MSF12345678F (Freelancer)
 */
export const generateMSFId = (role: UserRole): string => {
  const prefix = 'MSF';
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000).toString();
  return `${prefix}${randomNumber}${role}`;
};

export const validateMSFId = (id: string): boolean => {
  const pattern = /^MSF\d{8}[FCEA]$/;
  return pattern.test(id);
};
