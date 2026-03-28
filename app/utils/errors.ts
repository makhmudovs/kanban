export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error !== null && "body" in error) {
    const err = error as { body?: { message?: string } };
    return err.body?.message ?? "Something went wrong";
  }
  return "Something went wrong";
}