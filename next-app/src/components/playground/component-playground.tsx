"use client";

import { useEffect, useId, useState } from "react";
import type { ReactNode } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Modal,
  Progress,
  Select,
  Skeleton,
  Spinner,
  Textarea,
} from "@/components/ui";

const NAV = [
  { id: "tokens", label: "Tokens" },
  { id: "button", label: "Button" },
  { id: "badge", label: "Badge" },
  { id: "card", label: "Card" },
  { id: "input", label: "Input" },
  { id: "textarea", label: "Textarea" },
  { id: "select", label: "Select" },
  { id: "spinner", label: "Spinner" },
  { id: "progress", label: "Progress" },
  { id: "skeleton", label: "Skeleton" },
  { id: "modal", label: "Modal" },
] as const;

function PlayPanel({
  title,
  description,
  controls,
  preview,
}: {
  title: string;
  description?: string;
  controls: ReactNode;
  preview: ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="space-y-3 rounded-[var(--ref-radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Controls</h3>
        <p className="text-xs text-[var(--color-text-secondary)]">
          Adjust props and see the preview update live.
        </p>
        <div className="space-y-3">{controls}</div>
      </div>
      <div className="space-y-3 rounded-[var(--ref-radius-lg)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</h3>
        {description ? (
          <p className="text-xs text-[var(--color-text-secondary)]">{description}</p>
        ) : null}
        <div className="flex min-h-[120px] flex-wrap items-center gap-3">{preview}</div>
      </div>
    </div>
  );
}

function Toggle({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2 text-sm text-[var(--color-text-primary)]">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-[var(--color-border)] accent-[var(--color-brand)]"
      />
      {label}
    </label>
  );
}

export function ComponentPlayground() {
  const baseId = useId();

  const [forceDark, setForceDark] = useState(false);

  const [btnVariant, setBtnVariant] = useState<"primary" | "secondary" | "ghost" | "danger">("primary");
  const [btnSize, setBtnSize] = useState<"sm" | "md" | "lg">("md");
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnLabel, setBtnLabel] = useState("Click me");

  const [badgeVariant, setBadgeVariant] = useState<"neutral" | "brand" | "success" | "warning" | "error">(
    "brand",
  );
  const [badgeText, setBadgeText] = useState("Badge");

  const [cardShowBadge, setCardShowBadge] = useState(true);
  const [cardShowFooter, setCardShowFooter] = useState(true);
  const [cardTitle, setCardTitle] = useState("Example card");
  const [cardBody, setCardBody] = useState("Compose headers, body, and footer with tokens.");

  const [inputHint, setInputHint] = useState(true);
  const [inputError, setInputError] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const [taHint, setTaHint] = useState(true);
  const [taError, setTaError] = useState(false);
  const [taDisabled, setTaDisabled] = useState(false);
  const [taVal, setTaVal] = useState("");

  const [selectError, setSelectError] = useState(false);
  const [framework, setFramework] = useState("react");

  const [spinSize, setSpinSize] = useState<"xs" | "sm" | "md" | "lg">("md");
  const [spinSrLabel, setSpinSrLabel] = useState(true);

  const [progVal, setProgVal] = useState(40);
  const [progIndeterminate, setProgIndeterminate] = useState(false);
  const [progSize, setProgSize] = useState<"sm" | "md">("md");
  const [progTone, setProgTone] = useState<"brand" | "success">("brand");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState(true);

  useEffect(() => {
    if (forceDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [forceDark]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-12 md:px-10 md:py-16">
      <header className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
          Component playground
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Design system component library
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)]">
          Explore every primitive: tweak variants and states on the left, preview on the right. Storybook
          remains the source for full docs; this page is for quick hands-on exploration.
        </p>

        <div className="flex flex-wrap items-center gap-4 rounded-[var(--ref-radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <Toggle id={`${baseId}-dark`} checked={forceDark} onChange={setForceDark} label="Force dark theme" />
          <span className="hidden text-[var(--color-border)] sm:inline">|</span>
          <nav aria-label="Jump to component" className="flex flex-wrap gap-2">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-primary)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section id="tokens" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Semantic tokens</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Reference swatches mapped to CSS variables used by components.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              { label: "Brand", css: "bg-[var(--color-brand)]" },
              { label: "Success", css: "bg-[var(--color-success)]" },
              { label: "Warning", css: "bg-[var(--color-warning)]" },
              { label: "Error", css: "bg-[var(--color-error)]" },
              { label: "Info", css: "bg-[var(--color-info)]" },
              { label: "Surface", css: "bg-[var(--color-surface)] border border-[var(--color-border)]" },
              {
                label: "Elevated",
                css: "bg-[var(--color-surface-elevated)] border border-[var(--color-border)]",
              },
              { label: "Border", css: "bg-[var(--color-border)]" },
            ] as const
          ).map((swatch) => (
            <article
              key={swatch.label}
              className="rounded-[var(--ref-radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm"
            >
              <p className="mb-2 text-xs font-medium text-[var(--color-text-secondary)]">{swatch.label}</p>
              <div className={`h-12 rounded-md ${swatch.css}`} />
            </article>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <article className="rounded-[var(--ref-radius-md)] border border-[var(--color-border)] p-4 text-center shadow-sm">
            <p className="text-xs text-[var(--color-text-secondary)]">Radius md</p>
            <div
              className="mt-2 h-16 bg-[var(--color-brand)]"
              style={{ borderRadius: "var(--ref-radius-md)" }}
            />
          </article>
          <article className="rounded-[var(--ref-radius-md)] border border-[var(--color-border)] p-4 text-center shadow-sm">
            <p className="text-xs text-[var(--color-text-secondary)]">Shadow md</p>
            <div className="mt-2 h-16 rounded-md bg-[var(--color-surface-elevated)] shadow-[var(--ref-shadow-md)]" />
          </article>
          <article className="rounded-[var(--ref-radius-md)] border border-[var(--color-border)] p-4 text-center shadow-sm">
            <p className="text-xs text-[var(--color-text-secondary)]">Motion</p>
            <p className="mt-3 font-mono text-sm text-[var(--color-text-primary)]">
              var(--ref-motion-duration-base)
            </p>
          </article>
        </div>
      </section>

      <section id="button" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Button</h2>
        <PlayPanel
          title="Preview"
          description="Variants, sizes, loading, and disabled."
          controls={
            <>
              <Select
                aria-label="Button variant"
                value={btnVariant}
                onChange={(e) => setBtnVariant(e.target.value as typeof btnVariant)}
              >
                <option value="primary">primary</option>
                <option value="secondary">secondary</option>
                <option value="ghost">ghost</option>
                <option value="danger">danger</option>
              </Select>
              <Select
                aria-label="Button size"
                value={btnSize}
                onChange={(e) => setBtnSize(e.target.value as typeof btnSize)}
              >
                <option value="sm">sm</option>
                <option value="md">md</option>
                <option value="lg">lg</option>
              </Select>
              <Input label="Label" value={btnLabel} onChange={(e) => setBtnLabel(e.target.value)} />
              <Toggle id={`${baseId}-btn-load`} checked={btnLoading} onChange={setBtnLoading} label="Loading" />
              <Toggle id={`${baseId}-btn-dis`} checked={btnDisabled} onChange={setBtnDisabled} label="Disabled" />
            </>
          }
          preview={
            <Button variant={btnVariant} size={btnSize} loading={btnLoading} disabled={btnDisabled}>
              {btnLabel}
            </Button>
          }
        />
      </section>

      <section id="badge" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Badge</h2>
        <PlayPanel
          title="Preview"
          controls={
            <>
              <Select
                aria-label="Badge variant"
                value={badgeVariant}
                onChange={(e) => setBadgeVariant(e.target.value as typeof badgeVariant)}
              >
                <option value="neutral">neutral</option>
                <option value="brand">brand</option>
                <option value="success">success</option>
                <option value="warning">warning</option>
                <option value="error">error</option>
              </Select>
              <Input label="Text" value={badgeText} onChange={(e) => setBadgeText(e.target.value)} />
            </>
          }
          preview={<Badge variant={badgeVariant}>{badgeText}</Badge>}
        />
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-[var(--color-text-secondary)]">All variants:</span>
          <Badge variant="neutral">neutral</Badge>
          <Badge variant="brand">brand</Badge>
          <Badge variant="success">success</Badge>
          <Badge variant="warning">warning</Badge>
          <Badge variant="error">error</Badge>
        </div>
      </section>

      <section id="card" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Card</h2>
        <PlayPanel
          title="Preview"
          description="Composable regions: header, content, footer."
          controls={
            <>
              <Input label="Title" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} />
              <Textarea label="Body" rows={3} value={cardBody} onChange={(e) => setCardBody(e.target.value)} />
              <Toggle id={`${baseId}-card-badge`} checked={cardShowBadge} onChange={setCardShowBadge} label="Show badge" />
              <Toggle id={`${baseId}-card-foot`} checked={cardShowFooter} onChange={setCardShowFooter} label="Show footer" />
            </>
          }
          preview={
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle>{cardTitle}</CardTitle>
                  {cardShowBadge ? <Badge variant="brand">Live</Badge> : null}
                </div>
                <CardDescription>Optional supporting text for the card.</CardDescription>
              </CardHeader>
              <CardContent>{cardBody}</CardContent>
              {cardShowFooter ? (
                <CardFooter>
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="secondary">
                    Secondary
                  </Button>
                </CardFooter>
              ) : null}
            </Card>
          }
        />
      </section>

      <section id="input" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Input</h2>
        <PlayPanel
          title="Preview"
          controls={
            <>
              <Toggle id={`${baseId}-in-hint`} checked={inputHint} onChange={setInputHint} label="Show hint" />
              <Toggle id={`${baseId}-in-err`} checked={inputError} onChange={setInputError} label="Show error" />
              <Toggle id={`${baseId}-in-dis`} checked={inputDisabled} onChange={setInputDisabled} label="Disabled" />
            </>
          }
          preview={
            <div className="w-full max-w-md">
              <Input
                label="Email"
                placeholder="you@example.com"
                hint={inputHint ? "We never share your email." : undefined}
                error={inputError ? "Enter a valid email address." : undefined}
                disabled={inputDisabled}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
            </div>
          }
        />
      </section>

      <section id="textarea" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Textarea</h2>
        <PlayPanel
          title="Preview"
          controls={
            <>
              <Toggle id={`${baseId}-ta-hint`} checked={taHint} onChange={setTaHint} label="Show hint" />
              <Toggle id={`${baseId}-ta-err`} checked={taError} onChange={setTaError} label="Show error" />
              <Toggle id={`${baseId}-ta-dis`} checked={taDisabled} onChange={setTaDisabled} label="Disabled" />
            </>
          }
          preview={
            <div className="w-full max-w-md">
              <Textarea
                label="Notes"
                rows={4}
                placeholder="Type something…"
                hint={taHint ? "Keep notes concise for reviewers." : undefined}
                error={taError ? "This field is required." : undefined}
                disabled={taDisabled}
                value={taVal}
                onChange={(e) => setTaVal(e.target.value)}
              />
            </div>
          }
        />
      </section>

      <section id="select" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Select</h2>
        <PlayPanel
          title="Preview"
          controls={<Toggle id={`${baseId}-sel-err`} checked={selectError} onChange={setSelectError} label="Error state" />}
          preview={
            <div className="w-full max-w-md">
              <Select
                label="Framework"
                value={framework}
                onChange={(e) => setFramework(e.target.value)}
                error={selectError ? "Choose an option." : undefined}
              >
                <option value="react">React</option>
                <option value="vue">Vue</option>
                <option value="svelte">Svelte</option>
              </Select>
            </div>
          }
        />
      </section>

      <section id="spinner" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Spinner</h2>
        <PlayPanel
          title="Preview"
          description="Use with an explicit label for standalone loading regions; omit the label when nested (for example inside a loading button)."
          controls={
            <>
              <Select
                aria-label="Spinner size"
                value={spinSize}
                onChange={(e) => setSpinSize(e.target.value as typeof spinSize)}
              >
                <option value="xs">xs</option>
                <option value="sm">sm</option>
                <option value="md">md</option>
                <option value="lg">lg</option>
              </Select>
              <Toggle
                id={`${baseId}-spin-sr`}
                checked={spinSrLabel}
                onChange={setSpinSrLabel}
                label='Expose screen reader label (“Loading”)'
              />
            </>
          }
          preview={<Spinner size={spinSize} label={spinSrLabel ? "Loading" : undefined} />}
        />
      </section>

      <section id="progress" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Progress</h2>
        <PlayPanel
          title="Preview"
          description="Determinate bars reflect completion; indeterminate bars signal ongoing work without a known fraction."
          controls={
            <>
              <Toggle
                id={`${baseId}-prog-ind`}
                checked={progIndeterminate}
                onChange={setProgIndeterminate}
                label="Indeterminate"
              />
              <label className="flex flex-col gap-2 text-sm text-[var(--color-text-primary)]">
                <span>Value ({progVal})</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progVal}
                  disabled={progIndeterminate}
                  onChange={(e) => setProgVal(Number(e.target.value))}
                  className="w-full accent-[var(--color-brand)] disabled:opacity-40"
                />
              </label>
              <Select
                aria-label="Progress size"
                value={progSize}
                onChange={(e) => setProgSize(e.target.value as typeof progSize)}
              >
                <option value="sm">sm</option>
                <option value="md">md</option>
              </Select>
              <Select
                aria-label="Progress tone"
                value={progTone}
                onChange={(e) => setProgTone(e.target.value as typeof progTone)}
              >
                <option value="brand">brand</option>
                <option value="success">success</option>
              </Select>
            </>
          }
          preview={
            <div className="w-full max-w-md">
              <Progress
                value={progVal}
                indeterminate={progIndeterminate}
                size={progSize}
                tone={progTone}
              />
            </div>
          }
        />
      </section>

      <section id="skeleton" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Skeleton</h2>
        <PlayPanel
          title="Preview"
          description="Composable pulse blocks for card shells, lists, and dashboards."
          controls={
            <p className="text-xs text-[var(--color-text-secondary)]">
              Combine shapes with layout utilities; match approximate sizes to real content for less layout shift.
            </p>
          }
          preview={
            <Card className="w-full max-w-md">
              <CardHeader className="flex-row items-center gap-3 space-y-0">
                <Skeleton className="h-11 w-11 shrink-0 rounded-full" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-[92%]" />
                <Skeleton className="h-3 w-[88%]" />
              </CardContent>
            </Card>
          }
        />
      </section>

      <section id="modal" className="scroll-mt-24 space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Modal</h2>
        <PlayPanel
          title="Preview"
          description="Open to test focus trap and Escape."
          controls={
            <>
              <Button type="button" onClick={() => setModalOpen(true)}>
                Open modal
              </Button>
              <Toggle
                id={`${baseId}-mod-desc`}
                checked={modalDescription}
                onChange={setModalDescription}
                label="Show description"
              />
            </>
          }
          preview={<p className="text-sm text-[var(--color-text-secondary)]">Use &quot;Open modal&quot; in controls.</p>}
        />
      </section>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Modal example"
        description={
          modalDescription
            ? "Tab cycles focus inside the dialog. Escape closes."
            : undefined
        }
      >
        <div className="space-y-3">
          <Input label="Name" placeholder="Ada Lovelace" />
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setModalOpen(false)}>
              Save
            </Button>
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <footer className="border-t border-[var(--color-border)] pt-8 text-center text-sm text-[var(--color-text-secondary)]">
        For deeper docs and edge cases, run{" "}
        <code className="rounded bg-[var(--color-surface)] px-1.5 py-0.5 font-mono text-xs">npm run storybook</code>
        .
      </footer>
    </div>
  );
}
