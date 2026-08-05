export type ClientFeatureIcon = "images" | "file-text" | "download" | "lock";

export type ClientFeature = {
  icon: ClientFeatureIcon;
  title: string;
  copy: string;
};

export type SignInContent = {
  title: string;
  copy: string;
  fields: {
    code: string;
    password: string;
  };
  submitLabel: string;
  toastMessage: string;
};

export const clientAreaHeader = {
  eyebrow: "Client area",
  title: "Your galleries, privately.",
  copy: "Password-protected delivery: review selects, approve the edit, download finals and track print orders.",
  crumbLabel: "Client Area",
} as const;

export const signIn: SignInContent = {
  title: "Sign in",
  copy: "Use the gallery code and password from your delivery email.",
  fields: {
    code: "Gallery code",
    password: "Password",
  },
  submitLabel: "Enter Gallery",
  toastMessage: "Client logins go live once the delivery backend is connected.",
};

export const clientFeatures: ClientFeature[] = [
  {
    icon: "images",
    title: "Private galleries",
    copy: "Full-resolution previews, favourites and select lists.",
  },
  {
    icon: "file-text",
    title: "Approvals",
    copy: "Sign off the edit and leave frame-level notes.",
  },
  {
    icon: "download",
    title: "Downloads",
    copy: "Web and print-ready files, organised by deliverable.",
  },
  {
    icon: "lock",
    title: "Order tracking",
    copy: "Live status of album and print production.",
  },
];
