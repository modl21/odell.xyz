import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { useSeoMeta } from '@unhead/react';
import { ArrowUpRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface LinkItem {
  label: string;
  href: string;
  description?: string;
  note?: string;
  gold?: boolean;
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
  gold?: boolean;
}

const navLinks = [
  { id: 'contact', label: 'Contact' },
  { id: 'guides', label: 'Guides' },
  { id: 'resources', label: 'Resources' },
  { id: 'tools', label: 'Tools' },
  { id: 'donate', label: 'Donate' },
];

const allSections = [
  ...navLinks,
  { id: 'help', label: 'Help' },
  { id: 'liability', label: 'Liability' },
  { id: 'sponsors', label: 'Sponsors' },
  { id: 'investment', label: 'Investment' },
  { id: 'canary', label: 'Canary' },
];

const contactItems: ContactItem[] = [
  { label: 'Signal', value: 'ODELL.42', href: 'https://signal.me/#eu/HRcP2L9gdya44jj6lvfVtPNsyxRdiTsK2GIuAEFuciFj9ePBDHtKAbtGpyEffTsU', gold: true },
  { label: 'Nostr', value: 'odell@primal.net', href: 'https://primal.net/odell', gold: true },
  { label: 'SimpleX', value: 'ODELL', href: 'https://simplex.chat/contact#/?v=2-4&smp=smp%3A%2F%2F0YuTwO05YJWS8rkjn9eLJDjQhFKvIYd8d4xG8X1blIU%3D%40smp8.simplex.im%2FYsjR0DHt4mb8Ojcm7pXGonhZE1Sbu_mB%23%2F%3Fv%3D1-2%26dh%3DMCowBQYDK2VuAyEAfcIfVMSAWy615opqvRBq6MovGgaZ80uPYYfFrKDkIQM%253D%26srv%3Dbeccx4yfxxbvyhqypaavemqurytl6hozr47wfc7uuecacjqdvwpw2xid.onion' },
  { label: 'Keet', value: 'ODELL42', href: 'https://keet.io' },
  { label: 'GitHub', value: '@modl21', href: 'https://github.com/modl21' },
  { label: 'Email', value: 'odell@ten31.xyz', href: 'mailto:odell@ten31.xyz', gold: true },
];

const guides: LinkItem[] = [
  { label: 'werunbtc.com', href: 'https://werunbtc.com', description: 'Practical bitcoin guides and resources.' },
  { label: 'phoenix', href: 'https://werunbtc.com/phoenix', description: 'Easily spend and receive bitcoin on your phone.', gold: true },
  { label: 'coldcard', href: 'https://werunbtc.com/coldcard', description: 'Long term bitcoin savings kept offline.', gold: true },
  { label: 'bitcoin core', href: 'https://werunbtc.com/bitcoincore', description: 'Run and use your own bitcoin node.' },
  { label: 'bitcoin transaction fees', href: 'https://werunbtc.com/utxos', description: 'UTXO management.' },
  { label: 'opendime', href: 'https://werunbtc.com/opendime', description: 'A fun way to gift bitcoin.' },
  { label: 'bitcoin tools and resources', href: '#tools', description: 'A list of my favorites.' },
];

const otherBitcoinResources: LinkItem[] = [
  { label: 'Newsfeed', href: 'http://nobsbitcoin.com/' },
  { label: 'Data Dashboard', href: 'https://bitcoin.clarkmoody.com/dashboard/' },
  { label: '21 Lessons', href: 'https://21lessons.com/' },
  { label: 'Privacy Resources', href: 'https://bitcoin-only.com/#privacy' },
  { label: 'Bitcoin Q&A Guides', href: 'https://bitcoiner.guide/' },
  { label: 'Bitcoin Optech', href: 'https://bitcoinops.org/' },
  { label: 'Ministry of Nodes Guides', href: 'https://www.youtube.com/ministryofnodes' },
  { label: 'Lightning Node Management Guide', href: 'https://openoms.gitbook.io/lightning-node-management/' },
  { label: 'P2P Trade Volumes', href: 'https://www.usefultulips.org/Combined_World_Page.html' },
  { label: 'Bitcoin Stack Exchange', href: 'https://bitcoin.stackexchange.com/' },
  { label: 'Bitcoin Wiki', href: 'https://en.bitcoin.it/wiki/Main_Page' },
  { label: 'Bitcoin ACKs', href: 'https://bitcoinacks.com/', description: 'Bitcoin Core Activity Tracker.' },
  { label: 'Getting Started with Lightning Network', href: 'https://ln.guide/' },
  { label: 'Keep It Simple Bitcoin Guides', href: 'https://www.keepitsimplebitcoin.com/guides/' },
  { label: 'Software Verification Guide', href: 'https://www.bitcoinqna.com/post/verifying-software-101' },
  { label: 'General GPG Guide', href: 'https://medium.com/@acparas/gpg-quickstart-guide-d01f005ca99' },
  { label: 'Spanish Language Bitcoin Guides', href: 'https://estudiobitcoin.com/' },
  { label: 'Bisq Wiki', href: 'https://bisq.wiki/Main_Page' },
  { label: "The Hitchhiker\u2019s Guide to Online Anonymity", href: 'https://anonymousplanet.org/guide.html' },
  { label: 'Techlore Go Incognito Course', href: 'https://techlore.tech/goincognito.html' },
  { label: "Ketan\u2019s Blog", href: 'https://k3tan.com/' },
  { label: 'Saylor Academy - Bitcoin for Everybody', href: 'https://learn.saylor.org/course/PRDV151' },
  { label: "Econoalchemist\u2019s Guides", href: 'https://www.econoalchemist.com/' },
  { label: "Diverter\u2019s Guides", href: 'https://diverter.hostyourown.tools/' },
  { label: 'Bitcoin-Resources', href: 'https://bitcoin-resources.com/' },
];

const bitcoinToolGroups: LinkGroup[] = [
  { title: 'Offline Hardware wallets', description: 'best for savings', items: [
    { label: 'ColdCard', href: 'https://werunbtc.com/coldcard', note: 'BEST', gold: true },
    { label: 'Bitkey', href: 'https://bitkey.world', note: 'EASY' },
    { label: 'SeedSigner', href: 'https://seedsigner.com/', note: 'DIY' },
    { label: 'Trezor', href: 'https://trezor.io', note: 'SHITCOINS' },
  ]},
  { title: 'Mobile wallets', items: [
    { label: 'Primal', href: 'https://primal.net/downloads', gold: true },
    { label: 'Bull Wallet', href: 'https://wallet.bullbitcoin.com' },
    { label: 'Phoenix', href: 'https://phoenix.acinq.co/', gold: true },
    { label: 'Zeus', href: 'https://zeusln.app/' },
    { label: 'Cove', href: 'https://covebitcoinwallet.com' },
    { label: 'Cashu.me', href: 'https://cashu.me' },
    { label: 'Blixt Wallet', href: 'https://blixtwallet.github.io/' },
    { label: 'Nunchuk', href: 'https://nunchuk.io/' },
  ]},
  { title: 'Desktop wallets', items: [
    { label: 'Sparrow Wallet', href: 'https://www.sparrowwallet.com/', gold: true }, { label: 'Core', href: 'https://bitcoin.org/en/bitcoin-core/' },
  ]},
  { title: 'Self Hosted Multisig', items: [
    { label: 'Sparrow Wallet', href: 'https://www.sparrowwallet.com/' }, { label: 'Caravan', href: 'https://unchained-capital.github.io/caravan/#/' },
    { label: 'Electrum', href: 'https://electrum.org/' }, { label: 'Nunchuk', href: 'https://nunchuk.io/' },
  ]},
  { title: 'Hosted Multisig', items: [
    { label: 'Unchained Capital', href: 'https://unchained-capital.com/' }, { label: 'Casa', href: 'https://keys.casa/' },
  ]},
  { title: 'Block explorers', items: [
    { label: 'Mempool.Space', href: 'https://mempool.space/' }, { label: 'Blockstream', href: 'https://blockstream.info/' },
  ]},
  { title: 'Mempool', items: [{ label: 'Status', href: 'https://mempool.space/' }] },
  { title: 'Transaction', items: [{ label: 'Monitor', href: 'https://mempool.observer/monitor/' }] },
  { title: 'Prebuilt dedicated node', items: [{ label: 'Start9', href: 'https://start9.com/', gold: true }] },
  { title: 'Build your own dedicated node', items: [
    { label: 'Start9', href: 'https://start9.com/', gold: true }, { label: 'RaspiBlitz', href: 'https://raspiblitz.com/' },
    { label: 'Umbrel', href: 'https://getumbrel.com/' },
  ]},
];

const otherToolGroups: LinkGroup[] = [
  { title: 'Prebuilt computers', items: [{ label: 'Framework', href: 'https://frame.work' }, { label: 'System76', href: 'https://system76.com/' }, { label: 'Purism', href: 'https://puri.sm/' }] },
  { title: 'Desktop OS', items: [{ label: 'Pop!OS', href: 'https://pop.system76.com/' }, { label: 'Tails', href: 'https://tails.boum.org/', gold: true }] },
  { title: 'Browser', items: [{ label: 'Firefox', href: 'https://www.mozilla.org/en-US/firefox/new/' }, { label: 'Mullvad Browser', href: 'https://mullvad.net/en/browser' }, { label: 'Tor', href: 'https://www.torproject.org/download/' }, { label: 'UnGoogled Chromium', href: 'https://github.com/Eloston/ungoogled-chromium' }, { label: 'Chromium', href: 'https://www.chromium.org/' }] },
  { title: 'Mobile phone', items: [{ label: 'Pixel running GrapheneOS', href: 'https://grapheneos.org/', gold: true }] },
  { title: 'Messages', items: [{ label: 'Signal', href: 'https://signal.org/en/', gold: true }, { label: 'Simplex', href: 'https://simplex.chat/' }, { label: 'Threema', href: 'https://threema.ch/en' }] },
  { title: 'Hosted VPN', items: [{ label: 'Obscura', href: 'https://obscura.net', gold: true }, { label: 'Mullvad', href: 'https://mullvad.net/en/' }, { label: 'Proton', href: 'https://proton.me', gold: true }, { label: 'iVPN', href: 'https://www.ivpn.net/' }] },
  { title: 'Email', items: [{ label: 'Proton', href: 'https://proton.me', gold: true }, { label: 'Tutanota', href: 'https://tutanota.com/' }] },
  { title: 'Cross device notes/tasks', items: [{ label: 'StandardNotes', href: 'https://standardnotes.org/' }, { label: 'Proton', href: 'https://proton.me', gold: true }] },
  { title: 'Share files', items: [{ label: 'Wormhole', href: 'https://wormhole.app' }, { label: 'Onion Share', href: 'https://onionshare.org/' }, { label: 'Proton', href: 'https://proton.me', gold: true }] },
  { title: 'Password manager', items: [{ label: 'Proton', href: 'https://proton.me', gold: true }, { label: 'BitWarden', href: 'https://bitwarden.com/' }, { label: 'KeePass', href: 'https://keepass.info/' }] },
  { title: 'Two factor authentication', items: [{ label: '2FAS', href: 'https://2fas.com' }, { label: 'Aegis', href: 'https://getaegis.app/' }] },
  { title: 'Nostr', items: [
    { label: 'Primal', href: 'https://primal.net', gold: true },
    { label: 'Wisp', href: 'https://wisp.mobile', note: 'ANDROID' },
    { label: 'Nostur', href: 'https://nostur.com', note: 'IOS AND MAC' },
    { label: 'Amethyst', href: 'https://www.amethyst.social', note: 'ANDROID' },
  ]},
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function ext(href: string) {
  if (href.startsWith('#') || href.startsWith('mailto:')) return {};
  return { target: '_blank' as const, rel: 'noreferrer' };
}

function SmartLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a href={href} {...ext(href)} className={cn('underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground/50', className)}>
      {children}
    </a>
  );
}

// ---------------------------------------------------------------------------
// Micro components
// ---------------------------------------------------------------------------

function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-2xl font-medium tracking-tight text-foreground md:text-3xl">
      {title}
    </h2>
  );
}

function Divider() {
  return <hr className="border-t border-border" />;
}

function Pill({ href, label, note, gold }: { href: string; label: string; note?: string; gold?: boolean }) {
  return (
    <a
      href={href}
      {...ext(href)}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors hover:bg-accent',
        gold ? 'border-amber-500/30 text-amber-400' : 'border-border bg-card text-foreground',
      )}
    >
      {label}
      {note ? <span className={cn('text-[10px] font-medium uppercase tracking-wider', gold ? 'text-amber-500/70' : 'text-muted-foreground')}>{note}</span> : null}
    </a>
  );
}

function LinkRow({ href, label, description, gold }: { href: string; label: string; description?: string; gold?: boolean }) {
  return (
    <a
      href={href}
      {...ext(href)}
      className="group flex items-start justify-between gap-4 rounded-md px-3 py-2.5 -mx-3 transition-colors hover:bg-accent"
    >
      <div className="min-w-0">
        <span className={cn('text-sm', gold ? 'text-amber-400' : 'text-foreground')}>{label}</span>
        {description ? <span className="ml-2 text-sm text-muted-foreground">{description}</span> : null}
      </div>
      {!href.startsWith('#') && !href.startsWith('mailto:') ? (
        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      ) : null}
    </a>
  );
}

function ToolGroup({ group }: { group: LinkGroup }) {
  return (
    <div>
      <div className="mb-2.5 flex items-baseline gap-2">
        <h3 className="text-sm font-medium text-foreground">{group.title}</h3>
        {group.description ? <span className="text-xs text-muted-foreground">({group.description})</span> : null}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {group.items.map((item) => (
          <Pill key={`${group.title}-${item.label}`} href={item.href} label={item.label} note={item.note} gold={item.gold} />
        ))}
      </div>
    </div>
  );
}

function DonateQR() {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src="https://citadeldispatch.com/donate.png"
      alt="Donation QR code"
      loading="lazy"
      onError={() => setFailed(true)}
      className="mx-auto w-full max-w-[200px] rounded-lg border border-border bg-white p-3"
    />
  );
}

// ---------------------------------------------------------------------------
// Price ticker
// ---------------------------------------------------------------------------

function usePrices() {
  const [btc, setBtc] = useState<number | null>(null);
  const [xaut, setXaut] = useState<number | null>(null);

  const fetchPrices = useCallback(async () => {
    try {
      const res = await fetch(
        'https://proxy.shakespeare.diy/?url=' +
          encodeURIComponent('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether-gold&vs_currencies=usd'),
      );
      const data = await res.json();
      if (data.bitcoin?.usd) setBtc(data.bitcoin.usd);
      if (data['tether-gold']?.usd) setXaut(data['tether-gold'].usd);
    } catch {
      // silently fail — prices are non-critical
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const id = setInterval(fetchPrices, 60_000);
    return () => clearInterval(id);
  }, [fetchPrices]);

  return { btc, xaut };
}

function fmt(n: number | null) {
  if (n === null) return '—';
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function PriceTicker() {
  const { btc, xaut } = usePrices();

  return (
    <div className="flex items-center gap-3 text-xs tabular-nums text-muted-foreground">
      <span>
        <span className="text-amber-400">BTC</span>{' '}
        <span className="text-foreground">{fmt(btc)}</span>
      </span>
      <span className="text-border">|</span>
      <span>
        <span className="text-amber-400">XAUT</span>{' '}
        <span className="text-foreground">{fmt(xaut)}</span>
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const Index = () => {
  useSeoMeta({
    title: 'ODELL',
    description: 'Projects, guides, resources, tools, and disclosures.',
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <a href="#" className="text-lg font-semibold tracking-tight">ODELL</a>
            <PriceTicker />
          </div>

          <nav className="hidden items-center gap-5 md:flex">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="text-[13px] text-muted-foreground hover:text-foreground">
                {l.label}
              </a>
            ))}
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden" aria-label="Menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 border-border bg-background">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav className="mt-8 flex flex-col gap-1">
                {allSections.map((l) => (
                  <SheetClose asChild key={l.id}>
                    <a href={`#${l.id}`} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">
                      {l.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <div className="space-y-10 md:space-y-14">

          {/* Hero */}
          <section className="space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">ODELL</h1>
            <div className="max-w-2xl space-y-3 text-lg leading-relaxed text-muted-foreground">
              <p>
                <span className="text-foreground">Managing Partner</span> at{' '}
                <SmartLink href="https://ten31.xyz/home" className="text-amber-400 decoration-amber-400/30 hover:decoration-amber-400/60">Ten31</SmartLink>.
              </p>
              <p>
                <span className="text-foreground">CoFounder</span>:{' '}
                <SmartLink href="https://opensats.org/" className="text-amber-400 decoration-amber-400/30 hover:decoration-amber-400/60">OpenSats</SmartLink>,{' '}
                <SmartLink href="https://bitcoinpark.com/">Bitcoin Park</SmartLink>.
              </p>
              <p>
                <span className="text-foreground">Founding Board</span>:{' '}
                <SmartLink href="https://www.btcpolicy.org">Bitcoin Policy Institute</SmartLink>.
              </p>
              <p>
                <span className="text-foreground">Host</span>:{' '}
                <SmartLink href="https://citadeldispatch.com">Citadel Dispatch</SmartLink>,{' '}
                <SmartLink href="https://rhr.tv">Rabbit Hole Recap</SmartLink>.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 pt-2">
              <a
                href="https://citadelwire.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-amber-400"
              >
                podcasts and news
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://primal.net/odell"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
              >
                nostr
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </section>

          <Divider />

          {/* Contact */}
          <section className="space-y-6">
            <SectionHeading id="contact" title="Contact" />
            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  {...ext(item.href)}
                  className="group flex flex-col gap-1 bg-card p-4 transition-colors hover:bg-accent"
                >
                  <span className={cn('text-xs', item.gold ? 'text-amber-500/70' : 'text-muted-foreground')}>{item.label}</span>
                  <span className={cn('text-sm font-medium', item.gold ? 'text-amber-400' : 'text-foreground')}>{item.value}</span>
                </a>
              ))}
            </div>
          </section>

          <Divider />

          {/* Guides */}
          <section className="space-y-6">
            <SectionHeading id="guides" title="Guides" />
            <div className="flex flex-col">
              {guides.map((g) => (
                <LinkRow key={g.label} href={g.href} label={g.label} description={g.description} gold={g.gold} />
              ))}
            </div>
          </section>

          <Divider />

          {/* Bitcoin Tools */}
          <section className="space-y-8">
            <SectionHeading id="tools" title="Bitcoin Tools" />
            <div className="space-y-6">
              {bitcoinToolGroups.map((g) => <ToolGroup key={g.title} group={g} />)}
            </div>
          </section>

          <Divider />

          {/* Other Tools */}
          <section className="space-y-8">
            <SectionHeading id="other-tools" title="Other Tools" />
            <div className="space-y-6">
              {otherToolGroups.map((g) => <ToolGroup key={g.title} group={g} />)}
            </div>
          </section>

          <Divider />

          {/* Other Bitcoin Resources */}
          <section className="space-y-6">
            <SectionHeading id="resources" title="Other Bitcoin Resources" />
            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
              {otherBitcoinResources.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  {...ext(r.href)}
                  className="group flex items-center justify-between gap-3 bg-card px-4 py-3 transition-colors hover:bg-accent"
                >
                  <span className="text-sm text-foreground">{r.label}</span>
                  <ArrowUpRight className="h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </section>

          <Divider />

          {/* Donate */}
          <section className="space-y-6">
            <SectionHeading id="donate" title="Donate" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              I take pride in maintaining my independence. My voice cannot be bought. If you find my work helpful, sats are appreciated.
            </p>
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <a
                href="https://pay.zaprite.com/pl_RYA8Fjr7xU"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                DONATE
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
              </a>
              <DonateQR />
            </div>
          </section>

          <Divider />

          {/* Need some help */}
          <section className="space-y-4">
            <SectionHeading id="help" title="Need some help or guidance?" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Do not hesitate to reach out through my contact info <SmartLink href="#contact">above</SmartLink>.
            </p>
          </section>

          <Divider />

          {/* Liability */}
          <section className="space-y-4">
            <SectionHeading id="liability" title="Liability Disclosure" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              My content provides education as to general privacy and security practices when using Bitcoin. Should you choose to apply the practices described in linked content with bitcoin or any other digital asset you own now or may purchase in the future, you do so at your own risk and I shall in no event be liable for any financial loss suffered. Nothing shall be construed as providing consulting, financial advice or general advice as to securing any digital asset of value.
            </p>
          </section>

          <Divider />

          {/* Sponsor Disclosure */}
          <section className="space-y-4">
            <SectionHeading id="sponsors" title="Sponsor Disclosure" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              <SmartLink href="https://rhr.tv">Rabbit Hole Recap</SmartLink> is currently sponsored by Strike, Coinkite, Stakwork, and Salt of the Earth. Potential sponsors are screened heavily and they understand our opinions are not for sale. We hold our sponsors to a high standard and are often critical of them. I hope to move to a listener funded ad-free model as soon as possible. Search <span className="text-foreground">Rabbit Hole Recap</span> in your favorite podcast app and click subscribe!
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <SmartLink href="https://citadeldispatch.com/">Citadel Dispatch</SmartLink> is a free and open project that is 100% audience funded. It has never and will never have ads or sponsors. All sats <SmartLink href="https://pay.zaprite.com/pl_RYA8Fjr7xU">donated</SmartLink> are held in cold storage to help fund the project long term. Search <span className="text-foreground">Citadel Dispatch</span> in your favorite podcast app and click subscribe!
            </p>
          </section>

          <Divider />

          {/* Investment Disclosure */}
          <section className="space-y-4">
            <SectionHeading id="investment" title="Investment Disclosure" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              I am a managing partner at the largest bitcoin technology investor in the world - Ten31. Our team has deployed over $200M to support bitcoin companies and projects over the last two years. There is no promise of paid promotion or endorsement in those agreements. You can find a full list of <SmartLink href="https://ten31.xyz/home">our portfolio on our website</SmartLink>.
            </p>
          </section>

          <Divider />

          {/* Canary */}
          <section className="space-y-4">
            <SectionHeading id="canary" title="Canary" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              If this section disappears then something is wrong that I cannot disclose.
            </p>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Index;
