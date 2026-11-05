"use client";

import { Download, FileCode2 } from "lucide-react";
import { useAnalytics } from "./AnalyticsTracker";
import CopyInstallPrompt from "./CopyInstallPrompt";

type SkillActionsProps = {
  skill: {
    name: string;
    directory: string;
    downloadUrl: string;
    skillPath: string;
    size?: string | null;
    siteUrl: string;
  };
};

/**
 * Client-side action bar for a skill detail page.
 *
 * Tracks downloads (clicking Download .zip) via the analytics API, then lets
 * the native download proceed. Installs are tracked inside CopyInstallPrompt.
 */
export default function SkillActions({
  skill: { name, directory, downloadUrl, skillPath, size, siteUrl },
}: SkillActionsProps) {
  const { recordDownload } = useAnalytics();

  const handleDownload = () => {
    recordDownload(directory);
  };

  const skillUrl = `${siteUrl}${skillPath}`;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <a
        href={downloadUrl}
        download
        onClick={handleDownload}
        className="btn-primary"
      >
        <Download size={16} /> Download .zip
        {size ? (
          <span className="text-white/70">· {size}</span>
        ) : null}
      </a>
      <a
        href={skillPath}
        target="_blank"
        rel="noreferrer"
        className="btn-secondary"
      >
        <FileCode2 size={16} /> View SKILL.md
      </a>
      <CopyInstallPrompt
        name={name}
        directory={directory}
        skillUrl={skillUrl}
      />
    </div>
  );
}
