/* eslint-disable react/prop-types */
function ErrorFallBack({ error, resetErrorBoundary }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[var(--color1)]">
      <h1 className="text-3xl text-[var(--color-text)]">
        Something went wrong 🥲
      </h1>
      <p className="text-2xl text-red-500">
        {error ? "Unknown Error" : error.message}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="rounded-lg bg-[var(--color2)] p-2 text-3xl text-[var(--color-text)]"
      >
        Try Again
      </button>
    </div>
  );
}

export default ErrorFallBack;
