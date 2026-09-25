"use client";

import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Footer newsletter signup. Wire `subscribe` to a real API when available. */
function NewsletterForm({ placeholder, toastMessage }: { placeholder: string; toastMessage: string }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success(toastMessage);
    setEmail("");
  };

  return (
    <form className="mt-8 flex max-w-sm gap-2" onSubmit={handleSubmit}>
      <Input
        type="email"
        required
        placeholder={placeholder}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button type="submit" aria-label="Subscribe" size="icon" variant="gold">
        <ArrowRight />
      </Button>
    </form>
  );
}

export { NewsletterForm };
