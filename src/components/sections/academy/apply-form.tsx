"use client";

import Link from "next/link";
import { type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const labelClassName =
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";
const inputClassName = "h-9 rounded-xl border-input bg-background/50";

function ApplyForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.success("Application received. Our academy team will call you shortly.");
  }

  return (
    <form onSubmit={handleSubmit} className="glass space-y-5 rounded-[1.75rem] p-8">
      <div>
        <p className="eyebrow">Apply</p>
        <h2 className="mt-3 text-xl">Reserve a seat</h2>
      </div>
      <div className="space-y-2">
        <label htmlFor="name" className={labelClassName}>
          Full name
        </label>
        <Input id="name" required className={inputClassName} />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className={labelClassName}>
          Phone
        </label>
        <Input id="phone" required className={inputClassName} />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className={labelClassName}>
          Email
        </label>
        <Input id="email" type="email" required className={inputClassName} />
      </div>
      <div className="space-y-2">
        <label htmlFor="msg" className={labelClassName}>
          Anything we should know?
        </label>
        <Textarea id="msg" rows={3} className="rounded-xl bg-background/50" />
      </div>
      <Button type="submit" variant="gold" size="lg" className="w-full">
        Submit Application
      </Button>
      <Button asChild variant="quiet" size="lg" className="w-full">
        <Link href="/academy">Back to Courses</Link>
      </Button>
    </form>
  );
}

export { ApplyForm };
