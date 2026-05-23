import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";

export default function AdminLoginPage({
  searchParams
}: {
  searchParams?: { error?: string; from?: string };
}) {
  const from = searchParams?.from?.startsWith("/admin") ? searchParams.from : "/admin";

  return (
    <main className="grid min-h-screen place-items-center bg-mint/45 px-5 py-12">
      <section className="w-full max-w-md rounded-lg border border-forest/10 bg-white p-6 shadow-[0_18px_60px_rgba(5,46,26,0.12)]">
        <Link href="/" className="button-focus inline-flex items-center gap-2 rounded-md text-sm font-semibold text-forest hover:text-leaf">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to website
        </Link>

        <div className="mt-8 grid h-14 w-14 place-items-center rounded-2xl bg-forest text-limeglow">
          <LockKeyhole className="h-7 w-7" aria-hidden="true" />
        </div>
        <h1 className="mt-5 font-display text-3xl font-semibold text-forest">Admin Login</h1>
        <p className="mt-3 text-sm leading-6 text-graphite/68">
          Enter the admin password to customize website content.
        </p>

        <form action="/api/admin/login" method="post" className="mt-6 grid gap-4">
          <input type="hidden" name="from" value={from} />
          <label className="grid gap-2 text-sm font-semibold text-forest">
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className="h-12 rounded-lg border border-forest/10 bg-white px-4 text-base font-normal text-graphite outline-none transition focus:border-leaf"
              required
            />
          </label>
          {searchParams?.error ? (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              Incorrect password. Please try again.
            </p>
          ) : null}
          <button
            type="submit"
            className="button-focus inline-flex h-12 items-center justify-center gap-2 rounded-full bg-forest px-5 text-sm font-bold text-white hover:bg-pine"
          >
            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
            Unlock Portal
          </button>
        </form>
      </section>
    </main>
  );
}
