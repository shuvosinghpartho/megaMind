export interface Release {
  version: string
  date: string
  macos?: { url: string; size: string; checksum: string }
  windows?: { url: string; size: string; checksum: string }
  linux?: { url: string; size: string; checksum: string }
  releaseNotesUrl?: string
}

export const siteConfig = {
  name: 'MEGAMIND',
  tagline: 'A bio-inspired, memory-augmented agent that learns UI tasks from screen recordings and keeps what it has learned.',
  repoUrl: 'https://github.com/shuvosinghpartho/megaMind',
  contactEmail: 'contact@megamind.ai',
  domain: 'https://megamind.ai',
  license: 'MIT License',
  deepLinkScheme: 'megamind://',
  waitlistEndpoint: '',
  releases: [
    {
      version: 'v1.0.0',
      date: '2026-11-15',
      macos: {
        url: 'https://github.com/shuvosinghpartho/megaMind/releases/download/v1.0.0/MegaMind-1.0.0-arm64.dmg',
        size: '54.2 MB',
        checksum: 'sha256:8b4e72c81a9f023...',
      },
      windows: {
        url: 'https://github.com/shuvosinghpartho/megaMind/releases/download/v1.0.0/MegaMind-Setup-1.0.0.exe',
        size: '49.8 MB',
        checksum: 'sha256:f12a93d04b8e719...',
      },
      linux: {
        url: 'https://github.com/shuvosinghpartho/megaMind/releases/download/v1.0.0/MegaMind-1.0.0.AppImage',
        size: '47.5 MB',
        checksum: 'sha256:d891b2c7e03498a...',
      },
      releaseNotesUrl: 'https://github.com/shuvosinghpartho/megaMind/releases/tag/v1.0.0',
    },
  ] as Release[],
}
