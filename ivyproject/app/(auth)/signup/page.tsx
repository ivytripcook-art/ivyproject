"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError || !data.user) {
      setError(signUpError?.message ?? "Impossible de créer le compte.");
      setLoading(false);
      return;
    }

    // Le profil est créé côté serveur, idéalement via un trigger Postgres
    // (`on_auth_user_created`) plutôt qu'ici — voir supabase/schema.sql.
    // Insertion directe laissée ici à titre d'exemple simple pour le MVP :
    await supabase.from("profiles").insert({ id: data.user.id, username });

    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <div className="mb-8 text-center">
        <h1 className="text-xl font-medium text-white">Créer ton espace</h1>
        <p className="mt-1 text-sm text-muted">Ton studio privé, prêt en 1 minute</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Field
          label="Nom d'artiste"
          type="text"
          placeholder="Ivytrip"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
          minLength={8}
        />

        {error && <p className="mb-3 text-xs text-red-400">{error}</p>}

        <Button type="submit" disabled={loading} className="mb-3">
          {loading ? "Création..." : "Créer mon compte"}
        </Button>
      </form>

      <p className="text-center text-xs text-muted">
        Déjà un compte ?{" "}
        <Link href="/login" className="text-primary">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
