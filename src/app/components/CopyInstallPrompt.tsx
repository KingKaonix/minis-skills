"use client";

import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

type CopyInstallPromptProps = {
  name: string;
  skillUrl: string;
};

export default function CopyInstallPrompt({
  name,
  skillUrl,
}: CopyInstallPromptProps) {
  const [copied, setCopied] = useState(false);

  const prompt = `Install the skill "${name}" into Minis. Read the skill instructions at ${skillUrl} and add the skill to your Minis skills directory.`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; silently fail.
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="btn-secondary flex items-center gap-2"
      aria-label="Copy install prompt"
    >
      {copied ? (
        <>
          <Check size={16} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Clipboard size={16} />
          <span>Copy install prompt</span>
        </>
      )}
    </button>
  );
}
