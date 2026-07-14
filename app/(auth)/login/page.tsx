"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <div className="mb-8 text-center">
        <h1 className="text-xl font-medium text-white">IvyProject</h1>
        <p className="mt-1 text-sm text-muted">Le workspace privé des artistes</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Field
          label="Email"
          type="email"
          placeholder="toi@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Field
          label="Mot de passe"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="mb-3 text-xs text-red-400">{error}</p>}

        <Button type="submit" disabled={loading} className="mb-3">
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>

      <p className="text-center text-xs text-muted">
        Pas encore de compte ?{" "}
        <Link href="/signup" className="text-primary">
          Créer un compte
        </Link>
      </p>
    </div>
  );
}
