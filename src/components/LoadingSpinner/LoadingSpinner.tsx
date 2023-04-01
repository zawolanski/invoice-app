export const LoadingSpinner = () => {
  return (
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-[3px] border-current border-t-transparent text-primary"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
