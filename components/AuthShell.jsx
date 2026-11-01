export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="mx-auto grid min-h-[70vh] w-full max-w-md place-items-center px-4 py-12">
      <div className="w-full rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
        <h1 className="section-title">{title}</h1>
        <p className="mt-2 text-base-content/70">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
