"use client";

import { Calendar as CalendarIcon, ChevronDown, FileText, LoaderCircle, MessageCircle, Upload, X } from "lucide-react";
import { useRef, useState, useTransition, type FormEvent } from "react";
import { toast } from "sonner";

import { submitForm } from "@/app/actions/forms";
import { Honeypot } from "@/components/shared/honeypot";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type BookingCopy } from "@/lib/data/forms-copy";
import { REFERENCE_LIMITS, uploadReferences, uploadsEnabled } from "@/lib/uploads";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Matches date-fns `PPP` output, e.g. "August 5th, 2026". */
function formatLongDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";
  return `${MONTHS[month - 1]} ${day}${suffix}, ${year}`;
}

type FieldSelectProps = {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

/** Native select styled to match the original listbox trigger pixel-for-pixel. */
function FieldSelect({ label, placeholder, options, value, onChange, className }: FieldSelectProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          data-placeholder={value ? undefined : ""}
          className="flex h-9 w-full cursor-pointer appearance-none items-center justify-between rounded-xl border border-input bg-background/50 px-3 py-2 text-sm whitespace-nowrap shadow-sm ring-offset-background focus:ring-1 focus:ring-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 opacity-50" />
      </div>
    </div>
  );
}

/** Booking request form — saved to the studio inbox, with optional reference files. */
function BookingForm({ whatsapp, copy }: { whatsapp: string; copy: BookingCopy }) {
  const { form: bookingForm, services, cities, budgets } = copy;
  const [service, setService] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [date, setDate] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [pending, startTransition] = useTransition();
  const dateInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (list: FileList | null) => {
    const picked = Array.from(list ?? []);
    const accepted = picked.filter((file) => {
      if (!REFERENCE_LIMITS.types.includes(file.type)) {
        toast.error(`${file.name}: please use JPG, PNG, WebP, HEIC or PDF.`);
        return false;
      }
      if (file.size > REFERENCE_LIMITS.maxBytes) {
        toast.error(`${file.name} is larger than 10 MB.`);
        return false;
      }
      return true;
    });
    const next = [...files, ...accepted];
    if (next.length > REFERENCE_LIMITS.maxFiles) toast.error(`Up to ${REFERENCE_LIMITS.maxFiles} files.`);
    setFiles(next.slice(0, REFERENCE_LIMITS.maxFiles));
  };

  const openDatePicker = () => {
    const input = dateInputRef.current;
    if (!input) return;
    if (typeof input.showPicker === "function") {
      input.showPicker();
    } else {
      input.focus();
      input.click();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "");
    startTransition(async () => {
      let attachments: string[] = [];
      if (files.length && uploadsEnabled) {
        try {
          attachments = await uploadReferences(files);
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Couldn't upload your files.");
          return;
        }
      }
      const result = await submitForm("booking", {
        name: get("name"),
        email: get("email"),
        phone: get("phone"),
        service,
        date,
        city,
        budget,
        message: get("message"),
        attachments,
        company: get("company"),
      });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(bookingForm.toastMessage);
      form.reset();
      setService("");
      setCity("");
      setBudget("");
      setDate("");
      setFiles([]);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-[1.75rem] border border-border/60 bg-card/40 p-8 sm:p-10"
    >
      <Honeypot />
      <div className="grid gap-6 sm:grid-cols-2">
        <FieldSelect
          className="sm:col-span-2"
          label={bookingForm.service.label}
          placeholder={bookingForm.service.placeholder}
          options={services}
          value={service}
          onChange={setService}
        />
        <div className="space-y-2">
          <Label>{bookingForm.date.label}</Label>
          <div className="relative">
            <Button
              type="button"
              variant="quiet"
              onClick={openDatePicker}
              className={cn(
                "w-full justify-start rounded-xl bg-background/50 font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon />
              {date ? formatLongDate(date) : <span>{bookingForm.date.placeholder}</span>}
            </Button>
            <input
              ref={dateInputRef}
              type="date"
              tabIndex={-1}
              aria-hidden="true"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="sr-only bottom-0 left-0"
            />
          </div>
        </div>
        <FieldSelect
          label={bookingForm.city.label}
          placeholder={bookingForm.city.placeholder}
          options={cities}
          value={city}
          onChange={setCity}
        />
        <FieldSelect
          label={bookingForm.budget.label}
          placeholder={bookingForm.budget.placeholder}
          options={budgets}
          value={budget}
          onChange={setBudget}
        />
        <div className="space-y-2">
          <Label htmlFor="b-phone">{bookingForm.phone.label}</Label>
          <Input id="b-phone" name="phone" type="tel" autoComplete="tel" required maxLength={60} className="h-9 rounded-xl border-input bg-background/50" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="b-name">{bookingForm.name.label}</Label>
          <Input id="b-name" name="name" autoComplete="name" required maxLength={200} className="h-9 rounded-xl border-input bg-background/50" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="b-email">{bookingForm.email.label}</Label>
          <Input
            id="b-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            className="h-9 rounded-xl border-input bg-background/50"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="b-ref">{bookingForm.reference.label}</Label>
          <label
            htmlFor="b-ref"
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border/70 bg-background/40 px-5 py-6 text-sm text-muted-foreground transition-colors hover:border-primary/50"
          >
            <Upload className="size-4 text-primary" />
            {bookingForm.reference.prompt}
          </label>
          <input
            id="b-ref"
            type="file"
            multiple
            accept={REFERENCE_LIMITS.types.join(",")}
            className="hidden"
            onChange={(event) => {
              addFiles(event.target.files);
              event.target.value = "";
            }}
          />
          {files.length ? (
            <ul className="space-y-1.5 pt-1">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-xs text-foreground/80"
                >
                  <FileText className="size-3.5 shrink-0 text-primary" />
                  <span className="min-w-0 flex-1 truncate">{file.name}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${file.name}`}
                    onClick={() => setFiles(files.filter((_, i) => i !== index))}
                    className="cursor-pointer text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="b-msg">{bookingForm.message.label}</Label>
          <Textarea
            id="b-msg"
            name="message"
            maxLength={5000}
            rows={5}
            placeholder={bookingForm.message.placeholder}
            className="rounded-xl bg-background/50"
          />
        </div>
      </div>
      <div className="mt-9 flex flex-wrap gap-3">
        <Button type="submit" variant="gold" size="lg" disabled={pending}>
          {pending ? <LoaderCircle className="animate-spin" /> : null}
          {bookingForm.submitLabel}
        </Button>
        <Button asChild variant="quiet" size="lg">
          <a href={whatsapp} target="_blank" rel="noreferrer">
            <MessageCircle />
            {bookingForm.whatsappLabel}
          </a>
        </Button>
      </div>
    </form>
  );
}

export { BookingForm };
