import { useState, type ReactNode } from 'react';
import { useSeoMeta } from '@unhead/react';
import { ArrowRight, ExternalLink, HandCoins, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface LinkItem {
  label: string;
  href: string;
  description?: string;
  note?: string;
}

interface SectionLink {
  id: string;
  label: string;
}

interface LinkGroup {
  title: string;
  description?: string;
  items: LinkItem[];
}

interface ContactItem {
  label: string;
  value: string;
  href: string;
}

const sectionLinks: SectionLink[] = [
  { id: 'contact', label: 'Contact' },
  { id: 'current-projects', label: 'Current Projects' },
  { id: 'guides', label: 'Guides' },
  { id: 'other-bitcoin-resources', label: 'Other Bitcoin Resources' },
  { id: 'bitcoin-tools', label: 'Bitcoin Tools' },
  { id: 'other-tools', label: 'Other Tools' },
  { id: 'donate', label: 'Donate' },
  { id: 'need-some-help-or-guidance', label: 'Need some help or guidance?' },
  { id: 'liability-disclosure', label: 'Liability Disclosure' },
  { id: 'sponsor-disclosure', label: 'Sponsor Disclosure' },
  { id: 'investment-disclosure', label: 'Investment Disclosure' },
  { id: 'canary', label: 'Canary' },
];

const contactItems: ContactItem[] = [
  {
    label: 'Signal',
    value: 'ODELL.42',
    href: 'https://signal.me/#eu/HRcP2L9gdya44jj6lvfVtPNsyxRdiTsK2GIuAEFuciFj9ePBDHtKAbtGpyEffTsU',
  },
  {
    label: 'Nostr',
    value: 'odell@primal.net',
    href: 'https://primal.net/odell',
  },
  {
    label: 'SimpleX',
    value: 'ODELL',
    href: 'https://simplex.chat/contact#/?v=2-4&smp=smp%3A%2F%2F0YuTwO05YJWS8rkjn9eLJDjQhFKvIYd8d4xG8X1blIU%3D%40smp8.simplex.im%2FYsjR0DHt4mb8Ojcm7pXGonhZE1Sbu_mB%23%2F%3Fv%3D1-2%26dh%3DMCowBQYDK2VuAyEAfcIfVMSAWy615opqvRBq6MovGgaZ80uPYYfFrKDkIQM%253D%26srv%3Dbeccx4yfxxbvyhqypaavemqurytl6hozr47wfc7uuecacjqdvwpw2xid.onion',
  },
  {
    label: 'Keet',
    value: 'ODELL42',
    href: 'https://keet.io',
  },
  {
    label: 'GitHub',
    value: '@modl21',
    href: 'https://github.com/modl21',
  },
  {
    label: 'Email',
    value: 'odell@ten31.xyz',
    href: 'mailto:odell@ten31.xyz',
  },
];

const currentProjects: LinkItem[] = [
  { label: 'Ten31', href: 'https://ten31.vc/' },
  { label: 'OpenSats', href: 'https://opensats.org/' },
  { label: 'Bitcoin Park', href: 'https://bitcoinpark.com/' },
  { label: 'Citadel Dispatch', href: 'https://citadeldispatch.com/' },
  { label: 'Rabbit Hole Recap', href: 'https://rhr.tv' },
  { label: 'Bitcoin Policy Institute', href: 'https://www.btcpolicy.org' },
];

const guides: LinkItem[] = [
  {
    label: 'werunbtc.com',
    href: 'https://werunbtc.com',
    description: 'Practical bitcoin guides and resources.',
  },
  {
    label: 'phoenix',
    href: 'https://werunbtc.com/phoenix',
    description: 'Easily spend and receive bitcoin on your phone.',
  },
  {
    label: 'coldcard',
    href: 'https://werunbtc.com/coldcard',
    description: 'Long term bitcoin savings kept offline.',
  },
  {
    label: 'bitcoin core',
    href: 'https://werunbtc.com/bitcoincore',
    description: 'Run and use your own bitcoin node.',
  },
  {
    label: 'bitcoin transaction fees',
    href: 'https://werunbtc.com/utxos',
    description: 'UTXO management.',
  },
  {
    label: 'opendime',
    href: 'https://werunbtc.com/opendime',
    description: 'A fun way to gift bitcoin.',
  },
  {
    label: 'bitcoin tools and resources',
    href: '#bitcoin-tools',
    description: 'A list of my favorites.',
  },
];

const otherBitcoinResources: LinkItem[] = [
  { label: 'Newsfeed', href: 'http://nobsbitcoin.com/' },
  { label: 'Data Dashboard', href: 'https://bitcoin.clarkmoody.com/dashboard/' },
  { label: '21 Lessons', href: 'https://21lessons.com/' },
  { label: 'Privacy Resources', href: 'https://bitcoin-only.com/#privacy' },
  { label: 'Bitcoin Q&A Guides', href: 'https://bitcoiner.guide/' },
  { label: 'Bitcoin Optech', href: 'https://bitcoinops.org/' },
  { label: 'Ministry of Nodes Guides', href: 'https://www.youtube.com/ministryofnodes' },
  {
    label: 'Lightning Node Management Guide',
    href: 'https://openoms.gitbook.io/lightning-node-management/',
  },
  { label: 'P2P Trade Volumes', href: 'https://www.usefultulips.org/Combined_World_Page.html' },
  { label: 'Bitcoin Stack Exchange', href: 'https://bitcoin.stackexchange.com/' },
  { label: 'Bitcoin Wiki', href: 'https://en.bitcoin.it/wiki/Main_Page' },
  {
    label: 'Bitcoin ACKs',
    href: 'https://bitcoinacks.com/',
    description: 'Bitcoin Core Activity Tracker.',
  },
  { label: 'Getting Started with Lightning Network', href: 'https://ln.guide/' },
  {
    label: 'Keep It Simple Bitcoin Guides',
    href: 'https://www.keepitsimplebitcoin.com/guides/',
  },
  {
    label: 'Software Verification Guide',
    href: 'https://www.bitcoinqna.com/post/verifying-software-101',
  },
  {
    label: 'General GPG Guide',
    href: 'https://medium.com/@acparas/gpg-quickstart-guide-d01f005ca99',
  },
  { label: 'Spanish Language Bitcoin Guides', href: 'https://estudiobitcoin.com/' },
  { label: 'Bisq Wiki', href: 'https://bisq.wiki/Main_Page' },
  {
    label: 'The Hitchhiker’s Guide to Online Anonymity',
    href: 'https://anonymousplanet.org/guide.html',
  },
  { label: 'Techlore Go Incognito Course', href: 'https://techlore.tech/goincognito.html' },
  { label: 'Ketan’s Blog', href: 'https://k3tan.com/' },
  {
    label: 'Saylor Academy - Bitcoin for Everybody',
    href: 'https://learn.saylor.org/course/PRDV151',
  },
  { label: 'Econoalchemist’s Guides', href: 'https://www.econoalchemist.com/' },
  { label: 'Diverter’s Guides', href: 'https://diverter.hostyourown.tools/' },
  { label: 'Bitcoin-Resources', href: 'https://bitcoin-resources.com/' },
];

const bitcoinToolGroups: LinkGroup[] = [
  {
    title: 'Offline Hardware wallets',
    description: 'best for savings',
    items: [
      { label: 'ColdCard', href: 'https://werunbtc.com/coldcard', note: 'BEST' },
      { label: 'Bitkey', href: 'https://bitkey.world', note: 'EASY' },
      { label: 'SeedSigner', href: 'https://seedsigner.com/', note: 'DIY' },
    ],
  },
  {
    title: 'Android wallets',
    items: [
      { label: 'Primal', href: 'https://primal.net/downloads' },
      { label: 'Bull Wallet', href: 'https://wallet.bullbitcoin.com' },
      { label: 'Phoenix', href: 'https://phoenix.acinq.co/' },
      { label: 'Zeus', href: 'https://zeusln.app/' },
      { label: 'Cashu.me', href: 'https://cashu.me' },
      { label: 'Blixt Wallet', href: 'https://blixtwallet.github.io/' },
      { label: 'Nunchuk', href: 'https://nunchuk.io/' },
    ],
  },
  {
    title: 'iOS wallets',
    items: [
      { label: 'Primal', href: 'https://primal.net/downloads' },
      { label: 'Bull Wallet', href: 'https://wallet.bullbitcoin.com' },
      { label: 'Phoenix', href: 'https://phoenix.acinq.co/' },
      { label: 'Zeus', href: 'https://zeusln.app/' },
      { label: 'Cove', href: 'https://covebitcoinwallet.com' },
      { label: 'Cashu.me', href: 'https://cashu.me' },
      { label: 'Blixt Wallet', href: 'https://blixtwallet.github.io/' },
      { label: 'Nunchuk', href: 'https://nunchuk.io/' },
    ],
  },
  {
    title: 'Desktop wallets',
    items: [
      { label: 'Sparrow Wallet', href: 'https://www.sparrowwallet.com/' },
      { label: 'Core', href: 'https://bitcoin.org/en/bitcoin-core/' },
      { label: 'Proton', href: 'https://proton.me' },
    ],
  },
  {
    title: 'Self Hosted Multisig',
    items: [
      { label: 'Sparrow Wallet', href: 'https://www.sparrowwallet.com/' },
      { label: 'Caravan', href: 'https://unchained-capital.github.io/caravan/#/' },
      { label: 'Electrum', href: 'https://electrum.org/' },
      { label: 'Nunchuk', href: 'https://nunchuk.io/' },
    ],
  },
  {
    title: 'Hosted Multisig',
    items: [
      { label: 'Unchained Capital', href: 'https://unchained-capital.com/' },
      { label: 'Casa', href: 'https://keys.casa/' },
    ],
  },
  {
    title: 'Favorite block explorers',
    items: [
      { label: 'Mempool.Space', href: 'https://mempool.space/' },
      { label: 'Blockstream', href: 'https://blockstream.info/' },
    ],
  },
  {
    title: 'Mempool',
    items: [{ label: 'Status', href: 'https://mempool.space/' }],
  },
  {
    title: 'Transaction',
    items: [{ label: 'Monitor', href: 'https://mempool.observer/monitor/' }],
  },
  {
    title: 'Prebuilt dedicated node',
    items: [{ label: 'Start9', href: 'https://start9.com/' }],
  },
  {
    title: 'Build your own dedicated node',
    items: [
      { label: 'Start9', href: 'https://start9.com/' },
      { label: 'RaspiBlitz', href: 'https://raspiblitz.com/' },
      { label: 'Umbrel', href: 'https://getumbrel.com/' },
    ],
  },
];

const otherToolGroups: LinkGroup[] = [
  {
    title: 'Prebuilt computers',
    items: [
      { label: 'Framework', href: 'https://frame.work' },
      { label: 'System76', href: 'https://system76.com/' },
      { label: 'Purism', href: 'https://puri.sm/' },
    ],
  },
  {
    title: 'Desktop OS',
    items: [
      { label: 'Pop!OS', href: 'https://pop.system76.com/' },
      { label: 'Tails', href: 'https://tails.boum.org/' },
    ],
  },
  {
    title: 'Browser',
    items: [
      { label: 'Firefox', href: 'https://www.mozilla.org/en-US/firefox/new/' },
      { label: 'Mullvad Browser', href: 'https://mullvad.net/en/browser' },
      { label: 'Tor', href: 'https://www.torproject.org/download/' },
      { label: 'UnGoogled Chromium', href: 'https://github.com/Eloston/ungoogled-chromium' },
      { label: 'Chromium', href: 'https://www.chromium.org/' },
    ],
  },
  {
    title: 'Mobile phone',
    items: [{ label: 'Pixel running GrapheneOS', href: 'https://grapheneos.org/' }],
  },
  {
    title: 'Messages',
    items: [
      { label: 'Signal', href: 'https://signal.org/en/' },
      { label: 'Simplex', href: 'https://simplex.chat/' },
      { label: 'Threema', href: 'https://threema.ch/en' },
    ],
  },
  {
    title: 'Hosted VPN',
    items: [
      { label: 'Obscura', href: 'https://obscura.net' },
      { label: 'Mullvad', href: 'https://mullvad.net/en/' },
      { label: 'Proton', href: 'https://proton.me' },
      { label: 'iVPN', href: 'https://www.ivpn.net/' },
    ],
  },
  {
    title: 'Email',
    items: [
      { label: 'Proton', href: 'https://proton.me' },
      { label: 'Tutanota', href: 'https://tutanota.com/' },
    ],
  },
  {
    title: 'Cross device notes/tasks',
    items: [
      { label: 'StandardNotes', href: 'https://standardnotes.org/' },
      { label: 'Proton', href: 'https://proton.me' },
    ],
  },
  {
    title: 'Share files',
    items: [
      { label: 'Wormhole', href: 'https://wormhole.app' },
      { label: 'Onion Share', href: 'https://onionshare.org/' },
      { label: 'Proton', href: 'https://proton.me' },
    ],
  },
  {
    title: 'Password manager',
    items: [
      { label: 'Proton', href: 'https://proton.me' },
      { label: 'BitWarden', href: 'https://bitwarden.com/' },
      { label: 'KeePass', href: 'https://keepass.info/' },
    ],
  },
  {
    title: 'Two factor authentication',
    items: [
      { label: '2FAS', href: 'https://2fas.com' },
      { label: 'Aegis', href: 'https://getaegis.app/' },
    ],
  },
  {
    title: 'Nostr',
    items: [
      { label: 'Primal', href: 'https://primal.net' },
      { label: 'Nostur', href: 'https://nostur.com' },
      { label: 'Amethyst', href: 'https://www.amethyst.social' },
    ],
  },
];

function getAnchorProps(href: string) {
  if (href.startsWith('#')) {
    return {};
  }

  return {
    target: '_blank',
    rel: 'noreferrer',
  };
}

interface SmartLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

function SmartLink({ href, className, children }: SmartLinkProps) {
  return (
    <a
      href={href}
      {...getAnchorProps(href)}
      className={cn('underline decoration-white/15 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary/60', className)}
    >
      {children}
    </a>
  );
}

interface SectionShellProps {
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  contentClassName?: string;
  children: ReactNode;
}

function SectionShell({
  id,
  title,
  eyebrow,
  description,
  contentClassName,
  children,
}: SectionShellProps) {
  return (
    <section id={id} className="scroll-mt-28">
      <Card className="overflow-hidden rounded-[1.75rem] border-white/10 bg-white/[0.035] shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <CardHeader className="border-b border-white/10 bg-white/[0.02] p-6 md:p-8">
          {eyebrow ? (
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.32em] text-primary/75">
              {eyebrow}
            </p>
          ) : null}
          <CardTitle className="font-serif text-3xl tracking-tight md:text-[2.4rem]">
            {title}
          </CardTitle>
          {description ? (
            <CardDescription className="max-w-3xl pt-2 text-base leading-7 text-muted-foreground">
              {description}
            </CardDescription>
          ) : null}
        </CardHeader>
        <CardContent className={cn('p-6 md:p-8', contentClassName)}>{children}</CardContent>
      </Card>
    </section>
  );
}

function LinkTile({ item }: { item: LinkItem }) {
  return (
    <a
      href={item.href}
      {...getAnchorProps(item.href)}
      className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white/[0.05]"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <p className="text-base font-medium leading-6 text-foreground">{item.label}</p>
          {!item.href.startsWith('#') ? (
            <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
          ) : null}
        </div>
        {item.description ? (
          <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
        ) : null}
      </div>
      {item.note ? (
        <div className="mt-4 text-[11px] font-medium uppercase tracking-[0.28em] text-primary/75">
          {item.note}
        </div>
      ) : null}
    </a>
  );
}

function LinkCloudGroup({ group }: { group: LinkGroup }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="mb-4 space-y-2">
        <h3 className="text-lg font-medium text-foreground">{group.title}</h3>
        {group.description ? (
          <p className="text-sm uppercase tracking-[0.24em] text-primary/75">{group.description}</p>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2.5">
        {group.items.map((item) => (
          <a
            key={`${group.title}-${item.label}`}
            href={item.href}
            {...getAnchorProps(item.href)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-foreground transition-colors hover:border-primary/30 hover:bg-white/[0.07] hover:text-primary"
          >
            <span>{item.label}</span>
            {item.note ? (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                {item.note}
              </span>
            ) : null}
          </a>
        ))}
      </div>
    </div>
  );
}

function DonatePreview() {
  const [imageFailed, setImageFailed] = useState(false);

  if (imageFailed) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-[1.5rem] border border-dashed border-white/15 bg-black/20 p-8 text-center text-sm leading-7 text-muted-foreground">
        QR preview unavailable in this environment. The donate link above is still active.
      </div>
    );
  }

  return (
    <img
      src="https://citadeldispatch.com/donate.png"
      alt="Donation QR code"
      loading="lazy"
      onError={() => setImageFailed(true)}
      className="mx-auto w-full max-w-xs rounded-[1.5rem] border border-white/10 bg-white p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
    />
  );
}

const Index = () => {
  useSeoMeta({
    title: 'ODELL',
    description:
      'A dark, minimalist home for ODELL’s projects, guides, resources, tools, and disclosures.',
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              'radial-gradient(circle at top left, rgba(209, 170, 92, 0.16), transparent 28%), radial-gradient(circle at 82% 12%, rgba(255, 255, 255, 0.08), transparent 18%), radial-gradient(circle at 50% 100%, rgba(255, 255, 255, 0.05), transparent 24%)',
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)' }}
        />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/75 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-4">
          <a href="#odell" className="flex items-center gap-3">
            <span className="font-serif text-2xl tracking-tight text-foreground">ODELL</span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {sectionLinks.slice(0, 6).map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {section.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              className="hidden rounded-full border-white/10 bg-white/[0.04] text-foreground hover:bg-white/[0.08] sm:inline-flex"
            >
              <a href="#contact">Contact</a>
            </Button>
            <Button
              asChild
              className="hidden rounded-full bg-primary text-primary-foreground hover:bg-primary/90 sm:inline-flex"
            >
              <a href="#donate">Donate</a>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/10 bg-white/[0.04] text-foreground hover:bg-white/[0.08] lg:hidden"
                  aria-label="Open section navigation"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-white/10 bg-background/95 text-foreground">
                <SheetTitle className="sr-only">Site navigation</SheetTitle>
                <div className="mt-10 space-y-2">
                  {sectionLinks.map((section) => (
                    <SheetClose asChild key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base transition-colors hover:border-primary/30 hover:text-primary"
                      >
                        {section.label}
                      </a>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        <section id="odell" className="scroll-mt-28">
          <div className="container py-8 md:py-12 lg:py-16">
            <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 px-6 py-10 shadow-[0_40px_140px_rgba(0,0,0,0.45)] backdrop-blur-xl md:px-10 md:py-12 lg:px-12 lg:py-14">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 opacity-80"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01) 38%, rgba(255,255,255,0.03) 100%)',
                }}
              />

              <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
                <div className="space-y-8">
                  <div className="space-y-5">
                    <h1 className="font-serif text-5xl tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                      ODELL
                    </h1>
                    <p className="max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                      <span className="font-semibold text-foreground">Managing Partner</span> at{' '}
                      <SmartLink href="https://ten31.xyz/home">Ten31</SmartLink>.{' '}
                      <span className="font-semibold text-foreground">CoFounder</span>:{' '}
                      <SmartLink href="https://opensats.org/">OpenSats</SmartLink>,{' '}
                      <SmartLink href="https://www.btcpolicy.org">Bitcoin Policy Institute</SmartLink>,{' '}
                      <SmartLink href="https://bitcoinpark.com/">Bitcoin Park</SmartLink>.{' '}
                      <span className="font-semibold text-foreground">Host</span>:{' '}
                      <SmartLink href="https://citadeldispatch.com">Citadel Dispatch</SmartLink>,{' '}
                      <SmartLink href="https://rhr.tv">Rabbit Hole Recap</SmartLink>.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
                    >
                      <a href="#contact">
                        Get in touch
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-full border-white/10 bg-white/[0.04] px-6 text-foreground hover:bg-white/[0.08]"
                    >
                      <a href="#guides">Explore guides</a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-full border-white/10 bg-white/[0.04] px-6 text-foreground hover:bg-white/[0.08]"
                    >
                      <a href="https://primal.net/odell" target="_blank" rel="noreferrer">
                        Follow on Nostr
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="space-y-5">
                  <Card className="rounded-[1.5rem] border-white/10 bg-white/[0.04] shadow-none">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl">Current Projects</CardTitle>
                      <CardDescription className="text-sm leading-6 text-muted-foreground">
                        Active work across investing, philanthropy, education, media, and community.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-0">
                      {currentProjects.map((project) => (
                        <a
                          key={project.label}
                          href={project.href}
                          {...getAnchorProps(project.href)}
                          className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm transition-colors hover:border-primary/30 hover:text-primary"
                        >
                          <span>{project.label}</span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </a>
                      ))}
                    </CardContent>
                  </Card>

                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container pb-16 md:pb-20">
          <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10">
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                <Card className="rounded-[1.5rem] border-white/10 bg-white/[0.04] shadow-none">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">On this site</CardTitle>
                    <CardDescription className="text-sm leading-6 text-muted-foreground">
                      Every section from the original homepage, redesigned with a quieter visual rhythm.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-0">
                    {sectionLinks.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
                      >
                        {section.label}
                      </a>
                    ))}
                    <Separator className="my-4 bg-white/10" />
                    <p className="text-xs uppercase tracking-[0.26em] text-primary/70">Independent voice</p>
                    <p className="pt-2 text-sm leading-6 text-muted-foreground">
                      Designed to feel calm, precise, and readable without losing any of the original substance.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </aside>

            <div className="space-y-6 md:space-y-8">
              <SectionShell
                id="contact"
                eyebrow="Direct channels"
                title="Contact"
                description="Reach out through whichever channel best fits your threat model, workflow, or public platform."
              >
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {contactItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      {...getAnchorProps(item.href)}
                      className="group rounded-2xl border border-white/10 bg-black/20 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white/[0.05]"
                    >
                      <p className="text-sm uppercase tracking-[0.24em] text-primary/70">{item.label}</p>
                      <div className="mt-3 flex items-center justify-between gap-4">
                        <p className="text-base font-medium text-foreground">{item.value}</p>
                        <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                      </div>
                    </a>
                  ))}
                </div>
              </SectionShell>

              <SectionShell
                id="current-projects"
                eyebrow="Active work"
                title="Current Projects"
                description="Organizations, publications, and initiatives currently in motion."
              >
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {currentProjects.map((item) => (
                    <LinkTile key={item.href} item={item} />
                  ))}
                </div>
              </SectionShell>

              <SectionShell
                id="guides"
                eyebrow="Practical resources"
                title="Guides"
                description="Onboarding, operational, and self-custody references for actually using bitcoin well."
              >
                <div className="grid gap-4 xl:grid-cols-2">
                  {guides.map((item) => (
                    <LinkTile key={item.label} item={item} />
                  ))}
                </div>
              </SectionShell>

              <SectionShell
                id="other-bitcoin-resources"
                eyebrow="Curated reading list"
                title="Other Bitcoin Resources"
                description="A broad reference shelf covering privacy, verification, nodes, education, markets, and general research."
              >
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {otherBitcoinResources.map((item) => (
                    <LinkTile key={item.label} item={item} />
                  ))}
                </div>
              </SectionShell>

              <SectionShell
                id="bitcoin-tools"
                eyebrow="Stack"
                title="Bitcoin Tools"
                description="Wallets, multisig options, explorers, monitoring, and node infrastructure collected in one place."
              >
                <div className="grid gap-4 xl:grid-cols-2">
                  {bitcoinToolGroups.map((group) => (
                    <LinkCloudGroup key={group.title} group={group} />
                  ))}
                </div>
              </SectionShell>

              <SectionShell
                id="other-tools"
                eyebrow="Everyday ops"
                title="Other Tools"
                description="Hardware, operating systems, privacy software, communication tools, and daily-use services."
              >
                <div className="grid gap-4 xl:grid-cols-2">
                  {otherToolGroups.map((group) => (
                    <LinkCloudGroup key={group.title} group={group} />
                  ))}
                </div>
              </SectionShell>

              <SectionShell
                id="donate"
                eyebrow="Independent support"
                title="Donate"
                description="I take pride in maintaining my independence. My voice cannot be bought. If you find my work helpful, sats are appreciated."
                contentClassName="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center"
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-primary">
                    <HandCoins className="h-3.5 w-3.5" />
                    Direct support
                  </div>
                  <div className="space-y-4">
                    <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                      Audience-funded work preserves independence and keeps the signal clean.
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
                    >
                      <a href="https://pay.zaprite.com/pl_RYA8Fjr7xU" target="_blank" rel="noreferrer">
                        DONATE
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                <DonatePreview />
              </SectionShell>

              <SectionShell
                id="need-some-help-or-guidance"
                eyebrow="Open invitation"
                title="Need some help or guidance?"
              >
                <div className="flex flex-col gap-5 rounded-[1.5rem] border border-white/10 bg-black/20 p-6 md:flex-row md:items-center md:justify-between">
                  <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                    Do not hesitate to reach out through my contact info <SmartLink href="#contact">above</SmartLink>.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-white/10 bg-white/[0.04] text-foreground hover:bg-white/[0.08]"
                  >
                    <a href="#contact">View contact options</a>
                  </Button>
                </div>
              </SectionShell>

              <SectionShell
                id="liability-disclosure"
                eyebrow="Disclosure"
                title="Liability Disclosure"
              >
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
                  <p className="text-base leading-8 text-muted-foreground">
                    My content provides education as to general privacy and security practices when using Bitcoin. Should you choose to apply the practices described in linked content with bitcoin or any other digital asset you own now or may purchase in the future, you do so at your own risk and I shall in no event be liable for any financial loss suffered. Nothing shall be construed as providing consulting, financial advice or general advice as to securing any digital asset of value.
                  </p>
                </div>
              </SectionShell>

              <SectionShell
                id="sponsor-disclosure"
                eyebrow="Disclosure"
                title="Sponsor Disclosure"
              >
                <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
                  <p className="text-base leading-8 text-muted-foreground">
                    <SmartLink href="https://rhr.tv">Rabbit Hole Recap</SmartLink> is currently sponsored by Coinkite, Stakwork, Obscura, and SLNT. Potential sponsors are screened heavily and they understand our opinions are not for sale. We hold our sponsors to a high standard and are often critical of them. I hope to move to a listener funded ad-free model as soon as possible. Search <span className="font-semibold text-foreground">Rabbit Hole Recap</span> in your favorite podcast app and click subscribe!
                  </p>
                  <p className="text-base leading-8 text-muted-foreground">
                    <SmartLink href="https://citadeldispatch.com/">Citadel Dispatch</SmartLink> is a free and open project that is 100% audience funded. It has never and will never have ads or sponsors. All sats <SmartLink href="https://pay.zaprite.com/pl_RYA8Fjr7xU">donated</SmartLink> are held in cold storage to help fund the project long term. Search <span className="font-semibold text-foreground">Citadel Dispatch</span> in your favorite podcast app and click subscribe!
                  </p>
                </div>
              </SectionShell>

              <SectionShell
                id="investment-disclosure"
                eyebrow="Disclosure"
                title="Investment Disclosure"
              >
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
                  <p className="text-base leading-8 text-muted-foreground">
                    I am a managing partner at the largest bitcoin technology investor in the world - Ten31. Our team has deployed over $200M to support bitcoin companies and projects over the last two years. There is no promise of paid promotion or endorsement in those agreements. You can find a full list of <SmartLink href="https://ten31.xyz/home">our portfolio on our website</SmartLink>.
                  </p>
                </div>
              </SectionShell>

              <SectionShell id="canary" eyebrow="Status" title="Canary">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
                  <p className="text-base leading-8 text-muted-foreground">
                    If this section disappears then something is wrong that I cannot disclose.
                  </p>
                </div>
              </SectionShell>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="container flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Redesigned in a dark, minimalist system while preserving the original content and links.</p>
          <a
            href="https://shakespeare.diy"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline decoration-white/15 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary/60"
          >
            Vibed with Shakespeare
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
