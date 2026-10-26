export type ContactInput = { name: string; phone: string; email: string; careFor: string; message: string; website: string };
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;
export const careForOptions = ['Myself', 'A parent', 'My spouse or partner', 'Another family member', 'Someone else'];
export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (!input.name.trim()) errors.name = 'Please enter your name.';
  else if (input.name.length > 100) errors.name = 'Please keep your name under 100 characters.';
  if (!input.phone.trim()) errors.phone = 'Please enter your phone number.';
  else if (!/^[+\d\s().-]+$/.test(input.phone) || input.phone.replace(/\D/g, '').length < 7 || input.phone.length > 35) errors.phone = 'Please enter a valid phone number, including the area code.';
  if (!input.email.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email) || input.email.length > 254) errors.email = 'Please enter a valid email address.';
  if (input.careFor && !careForOptions.includes(input.careFor)) errors.careFor = 'Please choose one of the options.';
  if (input.message.length > 2000) errors.message = 'Please keep your message under 2,000 characters.';
  return errors;
}
