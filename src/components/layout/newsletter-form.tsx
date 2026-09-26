"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { useState, useTransition, type FormEvent } from "react";
import { toast } from "sonner";

import { submitForm } from "@/app/actions/forms";
import { Honeypot } from "@/components/shared/honeypot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Footer newsletter signup — saved to the studio inbox (one entry per address). */
function NewsletterForm({ placeholder, toastMessage }: { placeholder: string; toastMessage: string }) {
  const [email, setEmail] = useState("");
  const [pending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const company = String(new FormData(event.currentTarget).get("company") ?? "");
    startTransition(async () => {
      const result = await submitForm("newsletter", { email, company });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(toastMessage);
      setEmail("");
    });
  };

  return (
    <form className="relative mt-8 flex max-w-sm gap-2" onSubmit={handleSubmit}>
      <Honeypot />
      <Input
        type="email"
        name="email"
        autoComplete="email"
        required
        aria-label="Email address"
        placeholder={placeholder}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button type="submit" aria-label="Subscribe" size="icon" variant="gold" disabled={pending}>
        {pending ? <LoaderCircle className="animate-spin" /> : <ArrowRight />}
      </Button>
    </form>
  );
}

export { NewsletterForm };
