import { useState, type ReactNode } from 'react';
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

const navLinks = [
  { id: 'contact', label: 'Contact' },
  { id: 'projects', label: 'Projects' },
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
  { label: 'Signal', value: 'ODELL.42', href: 'https://signal.me/#eu/HRcP2L9gdya44jj6lvfVtPNsyxRdiTsK2GIuAEFuciFj9ePBDHtKAbtGpyEffTsU' },
  { label: 'Nostr', value: 'odell@primal.net', href: 'https://primal.net/odell' },
  { label: 'SimpleX', value: 'ODELL', href: 'https://simplex.chat/contact#/?v=2-4&smp=smp%3A%2F%2F0YuTwO05YJWS8rkjn9eLJDjQhFKvIYd8d4xG8X1blIU%3D%40smp8.simplex.im%2FYsjR0DHt4mb8Ojcm7pXGonhZE1Sbu_mB%23%2F%3Fv%3D1-2%26dh%3DMCowBQYDK2VuAyEAfcIfVMSAWy615opqvRBq6MovGgaZ80uPYYfFrKDkIQM%253D%26srv%3Dbeccx4yfxxbvyhqypaavemqurytl6hozr47wfc7uuecacjqdvwpw2xid.onion' },
  { label: 'Keet', value: 'ODELL42', href: 'https://keet.io' },
  { label: 'GitHub', value: '@modl21', href: 'https://github.com/modl21' },
  { label: 'Email', value: 'odell@ten31.xyz', href: 'mailto:odell@ten31.xyz' },
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
  { label: 'werunbtc.com', href: 'https://werunbtc.com', description: 'Practical bitcoin guides and resources.' },
  { label: 'phoenix', href: 'https://werunbtc.com/phoenix', description: 'Easily spend and receive bitcoin on your phone.' },
  { label: 'coldcard', href: 'https://werunbtc.com/coldcard', description: 'Long term bitcoin savings kept offline.' },
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
    { label: 'ColdCard', href: 'https://werunbtc.com/coldcard', note: 'BEST' },
    { label: 'Bitkey', href: 'https://bitkey.world', note: 'EASY' },
    { label: 'SeedSigner', href: 'https://seedsigner.com/', note: 'DIY' },
  ]},
  { title: 'Android wallets', items: [
    { label: 'Primal', href: 'https://primal.net/downloads' }, { label: 'Bull Wallet', href: 'https://wallet.bullbitcoin.com' },
    { label: 'Phoenix', href: 'https://phoenix.acinq.co/' }, { label: 'Zeus', href: 'https://zeusln.app/' },
    { label: 'Cashu.me', href: 'https://cashu.me' }, { label: 'Blixt Wallet', href: 'https://blixtwallet.github.io/' },
    { label: 'Nunchuk', href: 'https://nunchuk.io/' },
  ]},
  { title: 'iOS wallets', items: [
    { label: 'Primal', href: 'https://primal.net/downloads' }, { label: 'Bull Wallet', href: 'https://wallet.bullbitcoin.com' },
    { label: 'Phoenix', href: 'https://phoenix.acinq.co/' }, { label: 'Zeus', href: 'https://zeusln.app/' },
    { label: 'Cove', href: 'https://covebitcoinwallet.com' }, { label: 'Cashu.me', href: 'https://cashu.me' },
    { label: 'Blixt Wallet', href: 'https://blixtwallet.github.io/' }, { label: 'Nunchuk', href: 'https://nunchuk.io/' },
  ]},
  { title: 'Desktop wallets', items: [
    { label: 'Sparrow Wallet', href: 'https://www.sparrowwallet.com/' }, { label: 'Core', href: 'https://bitcoin.org/en/bitcoin-core/' },
    { label: 'Proton', href: 'https://proton.me' },
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
  { title: 'Prebuilt dedicated node', items: [{ label: 'Start9', href: 'https://start9.com/' }] },
  { title: 'Build your own dedicated node', items: [
    { label: 'Start9', href: 'https://start9.com/' }, { label: 'RaspiBlitz', href: 'https://raspiblitz.com/' },
    { label: 'Umbrel', href: 'https://getumbrel.com/' },
  ]},
];

const otherToolGroups: LinkGroup[] = [
  { title: 'Prebuilt computers', items: [{ label: 'Framework', href: 'https://frame.work' }, { label: 'System76', href: 'https://system76.com/' }, { label: 'Purism', href: 'https://puri.sm/' }] },
  { title: 'Desktop OS', items: [{ label: 'Pop!OS', href: 'https://pop.system76.com/' }, { label: 'Tails', href: 'https://tails.boum.org/' }] },
  { title: 'Browser', items: [{ label: 'Firefox', href: 'https://www.mozilla.org/en-US/firefox/new/' }, { label: 'Mullvad Browser', href: 'https://mullvad.net/en/browser' }, { label: 'Tor', href: 'https://www.torproject.org/download/' }, { label: 'UnGoogled Chromium', href: 'https://github.com/Eloston/ungoogled-chromium' }, { label: 'Chromium', href: 'https://www.chromium.org/' }] },
  { title: 'Mobile phone', items: [{ label: 'Pixel running GrapheneOS', href: 'https://grapheneos.org/' }] },
  { title: 'Messages', items: [{ label: 'Signal', href: 'https://signal.org/en/' }, { label: 'Simplex', href: 'https://simplex.chat/' }, { label: 'Threema', href: 'https://threema.ch/en' }] },
  { title: 'Hosted VPN', items: [{ label: 'Obscura', href: 'https://obscura.net' }, { label: 'Mullvad', href: 'https://mullvad.net/en/' }, { label: 'Proton', href: 'https://proton.me' }, { label: 'iVPN', href: 'https://www.ivpn.net/' }] },
  { title: 'Email', items: [{ label: 'Proton', href: 'https://proton.me' }, { label: 'Tutanota', href: 'https://tutanota.com/' }] },
  { title: 'Cross device notes/tasks', items: [{ label: 'StandardNotes', href: 'https://standardnotes.org/' }, { label: 'Proton', href: 'https://proton.me' }] },
  { title: 'Share files', items: [{ label: 'Wormhole', href: 'https://wormhole.app' }, { label: 'Onion Share', href: 'https://onionshare.org/' }, { label: 'Proton', href: 'https://proton.me' }] },
  { title: 'Password manager', items: [{ label: 'Proton', href: 'https://proton.me' }, { label: 'BitWarden', href: 'https://bitwarden.com/' }, { label: 'KeePass', href: 'https://keepass.info/' }] },
  { title: 'Two factor authentication', items: [{ label: '2FAS', href: 'https://2fas.com' }, { label: 'Aegis', href: 'https://getaegis.app/' }] },
  { title: 'Nostr', items: [{ label: 'Primal', href: 'https://primal.net' }, { label: 'Nostur', href: 'https://nostur.com' }, { label: 'Amethyst', href: 'https://www.amethyst.social' }] },
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

function Pill({ href, label, note }: { href: string; label: string; note?: string }) {
  return (
    <a
      href={href}
      {...ext(href)}
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
    >
      {label}
      {note ? <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{note}</span> : null}
    </a>
  );
}

function LinkRow({ href, label, description }: { href: string; label: string; description?: string }) {
  return (
    <a
      href={href}
      {...ext(href)}
      className="group flex items-start justify-between gap-4 rounded-md px-3 py-2.5 -mx-3 transition-colors hover:bg-accent"
    >
      <div className="min-w-0">
        <span className="text-sm text-foreground">{label}</span>
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
          <Pill key={`${group.title}-${item.label}`} href={item.href} label={item.label} note={item.note} />
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
          <a href="#" className="text-lg font-semibold tracking-tight">ODELL</a>

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
      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="space-y-16 md:space-y-24">

          {/* Hero */}
          <section className="space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">ODELL</h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              <span className="text-foreground">Managing Partner</span> at{' '}
              <SmartLink href="https://ten31.xyz/home">Ten31</SmartLink>.{' '}
              <span className="text-foreground">CoFounder</span>:{' '}
              <SmartLink href="https://opensats.org/">OpenSats</SmartLink>,{' '}
              <SmartLink href="https://www.btcpolicy.org">Bitcoin Policy Institute</SmartLink>,{' '}
              <SmartLink href="https://bitcoinpark.com/">Bitcoin Park</SmartLink>.{' '}
              <span className="text-foreground">Host</span>:{' '}
              <SmartLink href="https://citadeldispatch.com">Citadel Dispatch</SmartLink>,{' '}
              <SmartLink href="https://rhr.tv">Rabbit Hole Recap</SmartLink>.
            </p>
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
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                </a>
              ))}
            </div>
          </section>

          <Divider />

          {/* Current Projects */}
          <section className="space-y-6">
            <SectionHeading id="projects" title="Current Projects" />
            <div className="flex flex-wrap gap-2">
              {currentProjects.map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  {...ext(p.href)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3.5 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                >
                  {p.label}
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
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
                <LinkRow key={g.label} href={g.href} label={g.label} description={g.description} />
              ))}
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
