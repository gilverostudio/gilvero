"use client";

import { Calendar as CalendarIcon, ChevronDown, MessageCircle, Upload } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bookingForm, budgets, cities, services } from "@/content/booking";
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

/** Booking request form — six fields plus the instant WhatsApp shortcut. */
function BookingForm({ whatsapp }: { whatsapp: string }) {
  const [service, setService] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [date, setDate] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);

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
    toast.success(bookingForm.toastMessage);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.75rem] border border-border/60 bg-card/40 p-8 sm:p-10"
    >
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
          <Input id="b-phone" required className="h-9 rounded-xl border-input bg-background/50" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="b-email">{bookingForm.email.label}</Label>
          <Input
            id="b-email"
            type="email"
            required
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
          <input id="b-ref" type="file" multiple className="hidden" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="b-msg">{bookingForm.message.label}</Label>
          <Textarea
            id="b-msg"
            rows={5}
            placeholder={bookingForm.message.placeholder}
            className="rounded-xl bg-background/50"
          />
        </div>
      </div>
      <div className="mt-9 flex flex-wrap gap-3">
        <Button type="submit" variant="gold" size="lg">
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
