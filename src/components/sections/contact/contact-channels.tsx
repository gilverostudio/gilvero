import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { contactChannels, type ContactChannel, type ContactChannelIcon } from "@/content/contact";
import { getSections, getSettings, type SiteSettings } from "@/lib/data/site";

const channelIcons: Record<ContactChannelIcon, LucideIcon> = {
  "map-pin": MapPin,
  phone: Phone,
  mail: Mail,
  "message-circle": MessageCircle,
  clock: Clock,
};

/** Stack of glass cards for every way to reach the studio. */
type ChannelRow = { icon: ContactChannelIcon; label: string; field: keyof SiteSettings; text?: string; external?: boolean };

/** Build channels from settings so a changed phone/email/address shows everywhere at once. */
function buildChannels(settings: SiteSettings, rows: ChannelRow[]): ContactChannel[] {
  return rows.map((row) => {
    const value = String(settings[row.field] ?? "");
    const href =
      row.field === "phone" ? `tel:${value}` : row.field === "email" ? `mailto:${value}` : row.field === "whatsapp" ? value : undefined;
    return { icon: row.icon, label: row.label, value: row.text || value, href, external: row.external };
  });
}

async function ContactChannels() {
  const [settings, sections] = await Promise.all([getSettings(), getSections()]);
  const rows = (sections?.["contact.channels"] as { items?: ChannelRow[] } | undefined)?.items;
  const channels = rows ? buildChannels(settings, rows) : contactChannels;

  return (
    <div className="space-y-4">
      {channels.map((channel, index) => {
        const Icon = channelIcons[channel.icon];
        return (
          <Reveal key={channel.label} delay={index * 60}>
            <div className="glass flex items-start gap-4 rounded-2xl p-6">
              <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="text-[0.7rem] tracking-[0.22em] text-primary uppercase">
                  {channel.label}
                </p>
                {channel.href ? (
                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel="noreferrer"
                    className="mt-2 block text-sm text-foreground/85 hover:text-primary"
                  >
                    {channel.value}
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-foreground/85">{channel.value}</p>
                )}
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export { ContactChannels };
