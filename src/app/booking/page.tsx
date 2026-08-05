import { type Metadata } from "next";

import { BookingSection } from "@/components/sections/booking/booking-section";
import { PageHeader } from "@/components/shared/page-header";
import { bookingHeader } from "@/content/booking";

export const metadata: Metadata = {
  title: "Book a Shoot — Gilvero Creative Media",
  description:
    "Book photography, film or design work with Gilvero. Choose service, date, city and budget — a producer replies within one working day.",
};

export default function BookingPage() {
  return (
    <>
      <PageHeader
        eyebrow={bookingHeader.eyebrow}
        title={bookingHeader.title}
        copy={bookingHeader.copy}
        image="wedding"
        crumbs={[{ label: bookingHeader.crumbLabel }]}
      />
      <BookingSection />
    </>
  );
}
