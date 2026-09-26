"use client";

import { Lock } from "lucide-react";
import { type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type SignInContent } from "@/content/client-area";

/** Gallery sign-in — informational toast until the delivery backend exists. */
function SignInForm({ copy: signIn }: { copy: SignInContent }) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.info(signIn.toastMessage);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.75rem] border border-border/60 bg-card/40 p-8 sm:p-10"
    >
      <Lock className="size-5 text-primary" />
      <h2 className="mt-6 text-2xl">{signIn.title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{signIn.copy}</p>
      <div className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="ca-code">{signIn.fields.code}</Label>
          <Input id="ca-code" required className="h-9 rounded-xl border-input bg-background/50" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ca-pass">{signIn.fields.password}</Label>
          <Input
            id="ca-pass"
            type="password"
            required
            className="h-9 rounded-xl border-input bg-background/50"
          />
        </div>
      </div>
      <Button type="submit" variant="gold" size="lg" className="mt-8 w-full">
        {signIn.submitLabel}
      </Button>
    </form>
  );
}

export { SignInForm };
