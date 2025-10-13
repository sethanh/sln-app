import React from "react";

/**
 * TermsOfService.tsx
 *
 * A clean, English Terms of Service page component suitable for linking as the
 * "Application Terms of Service link" in Google Cloud Console (OAuth consent screen).
 *
 * How to use:
 * <TermsOfService
 *   appName="Your App"
 *   companyName="Your Company LLC"
 *   contactEmail="support@yourdomain.com"
 *   websiteUrl="https://yourdomain.com"
 *   privacyUrl="https://yourdomain.com/privacy"
 *   effectiveDate="2025-10-13"
 *   governingLaw="Laws of Vietnam"
 * />
 */

export type TermsOfServiceProps = {
  appName: string;
  /**
   * For individuals, set ownerName to your legal full name. If you are a company, you can still use this field
   * for the company name and set isIndividual to false.
   */
  ownerName: string;
  contactEmail: string;
  websiteUrl: string;
  privacyUrl: string;
  effectiveDate?: string; // ISO date string, e.g. "2025-10-13"
  lastUpdated?: string;  // ISO date string
  governingLaw?: string; // e.g. "Laws of Vietnam" or "Laws of Singapore"
  /** If true, the text will say "Owner" instead of "Provider/Company" and adjust the wording. */
  isIndividual?: boolean;
  /** Optional postal address (e.g., city, country) for contact/dispute notices */
  postalAddress?: string;
};

const SectionTitle: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <h2 id={id} className="scroll-mt-24 text-xl font-semibold tracking-tight mt-8 mb-3">
    {children}
  </h2>
);

const Paragraph: React.FC<React.PropsWithChildren> = ({ children }) => (
  <p className="leading-relaxed text-sm md:text-base text-gray-700 dark:text-gray-200">{children}</p>
);

const List: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ul className="list-disc pl-6 space-y-2 marker:text-gray-400">{children}</ul>
);

const AnchorLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} className="underline underline-offset-2 hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded">
    {children}
  </a>
);

const MetaRow: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-sm">
    <span className="text-gray-500 dark:text-gray-300 w-40 shrink-0">{label}</span>
    <span className="font-medium">{value ?? "—"}</span>
  </div>
);

const PrintButton: React.FC = () => (
  <button
    onClick={() => window.print()}
    className="px-3 py-2 rounded-2xl shadow hover:shadow-md transition border text-sm"
    aria-label="Print Terms of Service"
  >
    Print / Save as PDF
  </button>
);

const TableOfContents: React.FC = () => (
  <nav aria-label="Table of contents" className="border rounded-2xl p-4 bg-gray-50 dark:bg-gray-900/40">
    <h3 className="font-semibold mb-3">Contents</h3>
    <ol className="list-decimal pl-6 space-y-1 text-sm">
      <li><a className="underline underline-offset-2" href="#introduction">Introduction</a></li>
      <li><a className="underline underline-offset-2" href="#eligibility">Eligibility & Account</a></li>
      <li><a className="underline underline-offset-2" href="#oauth">Google OAuth & Permissions</a></li>
      <li><a className="underline underline-offset-2" href="#acceptable-use">Acceptable Use</a></li>
      <li><a className="underline underline-offset-2" href="#privacy">Privacy & Data</a></li>
      <li><a className="underline underline-offset-2" href="#ip">Intellectual Property</a></li>
      <li><a className="underline underline-offset-2" href="#warranty">Disclaimers</a></li>
      <li><a className="underline underline-offset-2" href="#liability">Limitation of Liability</a></li>
      <li><a className="underline underline-offset-2" href="#termination">Suspension & Termination</a></li>
      <li><a className="underline underline-offset-2" href="#modifications">Changes to the Service & Terms</a></li>
      <li><a className="underline underline-offset-2" href="#law">Governing Law</a></li>
      <li><a className="underline underline-offset-2" href="#contact">Contact</a></li>
    </ol>
  </nav>
);

const TermsOfService: React.FC<TermsOfServiceProps> = ({
  appName,
  ownerName,
  contactEmail,
  websiteUrl,
  privacyUrl,
  effectiveDate,
  lastUpdated,
  governingLaw = "Laws of Vietnam",
  isIndividual = true,
  postalAddress,
}) => {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 print:px-0 print:py-0">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{appName} — Terms of Service</h1>
          <div className="mt-3 grid gap-1">
            <MetaRow label={isIndividual ? "Owner" : "Provider"} value={ownerName} />
            <MetaRow label="Website" value={websiteUrl} />
            {postalAddress && <MetaRow label="Address" value={postalAddress} />}
            <MetaRow label="Effective date" value={effectiveDate} />
            <MetaRow label="Last updated" value={lastUpdated ?? effectiveDate} />
          </div>
        </div>
        <div className="shrink-0">
          <PrintButton />
        </div>
      </header>

      <div className="my-6">
        <TableOfContents />
      </div>

      <SectionTitle id="introduction">1. Introduction</SectionTitle>
      <Paragraph>
        Welcome to {appName} (the "Service"). By accessing or using the Service,
        you agree to be bound by these Terms of Service (the "Terms"). If you do not agree to the Terms,
        do not access or use the Service.
      </Paragraph>

      <SectionTitle id="eligibility">2. Eligibility & Account</SectionTitle>
      <List>
        <li>
          <Paragraph>
            You must be capable of forming a binding contract under applicable law to use the Service. If you
            use the Service on behalf of an entity, you represent that you have authority to bind that entity. If you
            are an individual sole proprietor (no registered company), you may still use the Service and enter into
            these Terms in your personal capacity.
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            You are responsible for maintaining the confidentiality of your account and for all activities
            that occur under your account.
          </Paragraph>
        </li>
      </List>

      <SectionTitle id="oauth">3. Google OAuth & Permissions</SectionTitle>
      <List>
        <li>
          <Paragraph>
            We use Google OAuth 2.0 for authentication. When you sign in with Google, we request only the minimum
            scopes necessary to operate the Service (e.g., basic profile information and email address), and only
            after you grant consent in Google's consent screen.
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            You can revoke access at any time in your Google Account settings. For details, visit
            {" "}
            <AnchorLink href="https://myaccount.google.com/permissions">Google Account Permissions</AnchorLink>.
          </Paragraph>
        </li>
      </List>

      <SectionTitle id="acceptable-use">4. Acceptable Use</SectionTitle>
      <List>
        <li>
          <Paragraph>
            You agree not to misuse the Service, including but not limited to: violating laws or regulations;
            infringing third-party rights; attempting unauthorized access; interfering with or disrupting
            the Service; or using automated means to access the Service in a manner that burdens our infrastructure.
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            We reserve the right to investigate violations and to suspend or terminate accounts involved in
            suspected abuse.
          </Paragraph>
        </li>
      </List>

      <SectionTitle id="privacy">5. Privacy & Data</SectionTitle>
      <Paragraph>
        We are committed to safeguarding your privacy. Our data practices, including what information we collect,
        how we use it, and your choices, are described in our {" "}
        <AnchorLink href={privacyUrl}>Privacy Policy</AnchorLink>.
      </Paragraph>
      <Paragraph>
        We do not sell personal data. We may disclose information when required by law or to protect our rights
        and users. For inquiries about data processing or deletion requests, contact us at {" "}
        <a className="underline underline-offset-2" href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </Paragraph>

      <SectionTitle id="ip">6. Intellectual Property</SectionTitle>
      <Paragraph>
        The Service, including software, text, designs, logos, and other content, is owned by {ownerName} or its
        licensors and is protected by intellectual property laws. Except as expressly permitted, you may not copy,
        modify, distribute, sell, or lease any part of the Service.
      </Paragraph>

      <SectionTitle id="warranty">7. Disclaimers</SectionTitle>
      <Paragraph>
        THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER
        EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
        PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE.
      </Paragraph>

      <SectionTitle id="liability">8. Limitation of Liability</SectionTitle>
      <Paragraph>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, {ownerName} (including any contractors) SHALL NOT BE LIABLE FOR ANY INDIRECT,
        INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED
        DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR
        ACCESS TO OR USE OF THE SERVICE.
      </Paragraph>

      <SectionTitle id="termination">9. Suspension & Termination</SectionTitle>
      <Paragraph>
        We may suspend or terminate your access to the Service at any time, with or without notice, for conduct that
        we believe violates these Terms or is otherwise harmful to other users, us, or third parties.
      </Paragraph>

      <SectionTitle id="modifications">10. Changes to the Service & Terms</SectionTitle>
      <Paragraph>
        We may modify the Service and these Terms from time to time. Material changes will be posted on this page
        with an updated “Last updated” date. Your continued use of the Service after changes become effective
        constitutes acceptance of the updated Terms.
      </Paragraph>

      <SectionTitle id="law">11. Governing Law</SectionTitle>
      <Paragraph>
        These Terms are governed by and construed in accordance with the {governingLaw}. Any disputes arising out of
        or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in the
        relevant jurisdiction, without regard to conflict of law provisions.
      </Paragraph>

      <SectionTitle id="contact">12. Contact</SectionTitle>
      <Paragraph>
        If you have questions, concerns, or complaints about these Terms, please contact {isIndividual ? "the Owner" : "us"} at {" "}
        <a className="underline underline-offset-2" href={`mailto:${contactEmail}`}>{contactEmail}</a>{postalAddress ? (
          <> or by mail at {postalAddress}.</>
        ) : (
          <>.</>
        )}
      </Paragraph>

      <footer className="mt-10 border-t pt-6 text-xs text-gray-500">
        © {new Date().getFullYear()} {ownerName}. All rights reserved.
      </footer>
    </main>
  );
};

export default TermsOfService;
