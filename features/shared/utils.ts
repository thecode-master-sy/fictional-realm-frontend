export function parseValidationErrors(
  errorMessage: string,
): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};
  const errorParts = errorMessage.split("; ");

  for (const part of errorParts) {
    // Matches "[body.fieldName] Error message"
    const match = part.match(/^\[body\.([^\]]+)\]\s*(.+)$/);

    if (match) {
      const field = match[1];
      const msg = match[2];

      if (!fieldErrors[field]) {
        fieldErrors[field] = [];
      }
      fieldErrors[field].push(msg);
    }
  }

  return fieldErrors;
}
