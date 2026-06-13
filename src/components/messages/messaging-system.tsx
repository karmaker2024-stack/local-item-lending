import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronRight,
  CircleEllipsis,
  FileText,
  Flag,
  Image as ImageIcon,
  MapPin,
  MoreHorizontal,
  Paperclip,
  Search,
  Send,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";

import drillImage from "@/assets/listing-drill.jpg";
import cameraImage from "@/assets/listing-camera.jpg";
import campingImage from "@/assets/listing-camping.jpg";
import eventImage from "@/assets/listing-event.jpg";
import ownerImage from "@/assets/owner-maya.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/brand/brand-logo";

type Message = {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
  status?: "sent" | "read";
  file?: string;
};
type Conversation = {
  id: string;
  name: string;
  initials: string;
  item: string;
  image: string;
  preview: string;
  time: string;
  unread: number;
  online?: boolean;
  dates: string;
  total: string;
  location: string;
  messages: Message[];
};

const conversations: Conversation[] = [
  {
    id: "cordless-drill-maya",
    name: "Maya Chen",
    initials: "MC",
    item: "Cordless drill kit",
    image: drillImage,
    preview: "Perfect, see you Saturday!",
    time: "2m",
    unread: 1,
    online: true,
    dates: "Jun 15 – 17",
    total: "$42.00",
    location: "Mission District",
    messages: [
      {
        id: "m1",
        from: "them",
        text: "Hi Alex! Thanks for reserving the drill kit. It’s fully charged and ready to go.",
        time: "10:18 AM",
      },
      {
        id: "m2",
        from: "me",
        text: "Amazing, thank you! Would Saturday around 10 work for pickup?",
        time: "10:22 AM",
        status: "read",
      },
      {
        id: "m3",
        from: "them",
        text: "Perfect, see you Saturday! I’ll meet you by the main entrance.",
        time: "10:24 AM",
      },
    ],
  },
  {
    id: "camera-jordan",
    name: "Jordan Lee",
    initials: "JL",
    item: "Sony mirrorless camera",
    image: cameraImage,
    preview: "I’ve approved your request",
    time: "1h",
    unread: 0,
    dates: "Jun 21 – 23",
    total: "$126.00",
    location: "Noe Valley",
    messages: [
      {
        id: "j1",
        from: "them",
        text: "I’ve approved your request. The camera comes with two batteries and a 64GB card.",
        time: "9:04 AM",
      },
    ],
  },
  {
    id: "tent-sam",
    name: "Sam Rivera",
    initials: "SR",
    item: "4-person camping tent",
    image: campingImage,
    preview: "Thanks again — everything was great!",
    time: "Tue",
    unread: 0,
    dates: "Completed Jun 8",
    total: "$68.00",
    location: "Bernal Heights",
    messages: [
      {
        id: "s1",
        from: "them",
        text: "Thanks again — everything was great! I’ve marked the tent as returned.",
        time: "Tuesday",
      },
    ],
  },
  {
    id: "speaker-priya",
    name: "Priya Shah",
    initials: "PS",
    item: "Portable party speaker",
    image: eventImage,
    preview: "Is the Bluetooth range good outdoors?",
    time: "Mon",
    unread: 2,
    dates: "Request pending",
    total: "$36.00",
    location: "SOMA",
    messages: [
      {
        id: "p1",
        from: "them",
        text: "Is the Bluetooth range good outdoors? We’re planning a small garden party.",
        time: "Monday",
      },
    ],
  },
];

const quickReplies = [
  "Sounds good!",
  "What time works for you?",
  "I’m on my way",
  "Thanks for letting me know",
];

export function MessagingSystem({ threadId }: { threadId?: string }) {
  const [query, setQuery] = useState("");
  const [messagesByThread, setMessagesByThread] = useState<Record<string, Message[]>>(() =>
    Object.fromEntries(
      conversations.map((conversation) => [conversation.id, conversation.messages]),
    ),
  );
  const [draft, setDraft] = useState("");
  const [attachment, setAttachment] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const active = conversations.find((conversation) => conversation.id === threadId);
  const filtered = useMemo(
    () =>
      conversations.filter((conversation) =>
        `${conversation.name} ${conversation.item}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, [threadId]);

  const sendMessage = () => {
    if (!active || (!draft.trim() && !attachment)) return;
    const message: Message = {
      id: crypto.randomUUID(),
      from: "me",
      text: draft.trim() || "Shared an attachment",
      time: "Now",
      status: "sent",
      file: attachment ?? undefined,
    };
    setMessagesByThread((current) => ({
      ...current,
      [active.id]: [...(current[active.id] ?? []), message],
    }));
    setDraft("");
    setAttachment(null);
    requestAnimationFrame(() => inputRef.current?.focus());
    window.setTimeout(() => {
      setMessagesByThread((current) => ({
        ...current,
        [active.id]: (current[active.id] ?? []).map((item) =>
          item.id === message.id ? { ...item, status: "read" } : item,
        ),
      }));
    }, 900);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    sendMessage();
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background lg:h-screen lg:overflow-hidden">
      <header className="hidden h-18 items-center border-b border-border bg-card px-6 lg:flex">
        <Link to="/" aria-label="Flex My Stuff home" className="rounded-xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40">
          <BrandLogo className="h-13 w-24" />
        </Link>
        <div className="ml-auto flex items-center gap-3 text-sm text-muted-foreground">
          <ShieldCheck className="size-4 text-success" /> Messages are protected
          <Avatar className="ml-3 size-9">
            <AvatarImage src={ownerImage} alt="Your profile" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="mx-auto flex h-dvh max-w-[1600px] bg-card lg:h-[calc(100dvh-4.5rem)] lg:border-x lg:border-border">
        <aside
          className={cn(
            "w-full shrink-0 border-r border-border bg-card lg:block lg:w-[360px]",
            active && "hidden",
          )}
        >
          <div className="border-b border-border px-5 pb-4 pt-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">
                  Your inbox
                </p>
                <h1 className="mt-1 text-2xl font-bold">Messages</h1>
              </div>
              <Button size="icon" variant="ghost" aria-label="More inbox options">
                <MoreHorizontal />
              </Button>
            </div>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-h-11 bg-muted/60 pl-10 shadow-none"
                placeholder="Search conversations"
              />
            </div>
          </div>
          <ScrollArea className="h-[calc(100dvh-10.5rem)] lg:h-[calc(100dvh-11.25rem)]">
            <div className="divide-y divide-border/70">
              {filtered.map((conversation) => (
                <Link
                  key={conversation.id}
                  to="/messages/$threadId"
                  params={{ threadId: conversation.id }}
                  className={cn(
                    "grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3 px-4 py-4 transition-colors hover:bg-muted/60",
                    active?.id === conversation.id && "bg-highlight/12",
                  )}
                >
                  <div className="relative">
                    <Avatar className="size-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {conversation.initials}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-card bg-success" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-bold">{conversation.name}</p>
                      <span className="truncate text-xs text-muted-foreground">
                        · {conversation.item}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "mt-1 truncate text-sm text-muted-foreground",
                        conversation.unread && "font-semibold text-foreground",
                      )}
                    >
                      {conversation.preview}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                    {conversation.unread > 0 && (
                      <span className="grid size-5 place-items-center rounded-full bg-highlight text-[0.65rem] font-bold text-highlight-foreground">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {active ? (
          <section className="flex min-w-0 flex-1 flex-col bg-background">
            <div className="grid min-h-18 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-card px-3 sm:px-5">
              <Button asChild size="icon" variant="ghost" className="lg:hidden">
                <Link to="/messages" aria-label="Back to conversations">
                  <ArrowLeft />
                </Link>
              </Button>
              <div className="flex min-w-0 items-center gap-3">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {active.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h1 className="truncate text-base font-bold">{active.name}</h1>
                  <p className="truncate text-xs text-success">
                    {active.online ? "Online now" : "Usually replies within an hour"}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" aria-label="Conversation options">
                    <CircleEllipsis />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Search />
                    Search conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Star />
                    Mark as important
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Flag />
                    Report concern
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <BookingContext conversation={active} />

            <ScrollArea className="min-h-0 flex-1">
              <div className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-6 sm:px-7">
                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-border" />
                  <span className="text-xs font-medium text-muted-foreground">Today</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                {(messagesByThread[active.id] ?? []).map((message, index) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex max-w-[85%] flex-col gap-1 sm:max-w-[70%]",
                      message.from === "me" ? "ml-auto items-end" : "items-start",
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm leading-6 shadow-subtle",
                        message.from === "me"
                          ? "rounded-br-md bg-primary text-primary-foreground"
                          : "rounded-bl-md border border-border bg-card text-card-foreground",
                      )}
                    >
                      {message.file && (
                        <div className="mb-2 flex items-center gap-2 border-b border-current/15 pb-2">
                          <FileText className="size-4" />
                          <span className="max-w-48 truncate text-xs font-semibold">
                            {message.file}
                          </span>
                        </div>
                      )}
                      {message.text}
                    </div>
                    <span className="flex items-center gap-1 px-1 text-[0.68rem] text-muted-foreground">
                      {message.time}
                      {message.from === "me" &&
                        (message.status === "read" ? (
                          <>
                            <CheckCheck className="size-3 text-accent" /> Read
                          </>
                        ) : (
                          <>
                            <Check className="size-3" /> Sent
                          </>
                        ))}
                    </span>
                    {index === 0 && message.from === "them" && (
                      <span className="sr-only">Message from {active.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border bg-card px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
              <div className="mx-auto max-w-3xl">
                <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                  {quickReplies.map((reply) => (
                    <Button
                      key={reply}
                      type="button"
                      size="sm"
                      variant="outline"
                      className="shrink-0 rounded-full"
                      onClick={() => {
                        setDraft(reply);
                        inputRef.current?.focus();
                      }}
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
                {attachment && (
                  <div className="mb-2 flex w-fit items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs font-semibold">
                    <Paperclip className="size-3.5" />
                    <span className="max-w-56 truncate">{attachment}</span>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="min-h-11 min-w-11"
                      onClick={() => setAttachment(null)}
                      aria-label="Remove attachment"
                    >
                      <X className="size-3" />
                    </Button>
                  </div>
                )}
                <form
                  onSubmit={submit}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-end gap-2 rounded-2xl border border-input bg-background p-2 shadow-subtle focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/15"
                >
                  <input
                    ref={fileRef}
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) setAttachment(file.name);
                    }}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => fileRef.current?.click()}
                    aria-label="Attach file"
                  >
                    <Paperclip />
                  </Button>
                  <Textarea
                    ref={inputRef}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    className="max-h-32 min-h-11 resize-none border-0 bg-transparent px-2 py-2.5 shadow-none focus-visible:ring-0"
                    placeholder={`Message ${active.name.split(" ")[0]}…`}
                    aria-label="Message"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    variant="highlight"
                    disabled={!draft.trim() && !attachment}
                    aria-label="Send message"
                  >
                    <Send />
                  </Button>
                </form>
                <p className="mt-2 hidden text-center text-[0.68rem] text-muted-foreground sm:block">
                  Press Enter to send · Shift + Enter for a new line
                </p>
              </div>
            </div>
          </section>
        ) : (
          <section className="hidden flex-1 place-items-center bg-background lg:grid">
            <div className="text-center">
              <div className="mx-auto grid size-16 place-items-center rounded-3xl bg-highlight/20 text-primary">
                <Send className="size-7" />
              </div>
              <h2 className="mt-5 text-2xl font-bold">Your conversations</h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                Choose a conversation to coordinate pickup, ask a question, or share an update.
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function BookingContext({ conversation }: { conversation: Conversation }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-border bg-card px-3 py-3 sm:px-5">
      <div className="mx-auto grid max-w-4xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
        <img
          src={conversation.image}
          alt={conversation.item}
          className="size-14 shrink-0 rounded-xl object-cover"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Badge className="bg-highlight text-highlight-foreground hover:bg-highlight">
              Confirmed
            </Badge>
            <span className="truncate text-xs text-muted-foreground">Booking</span>
          </div>
          <h2 className="mt-1 truncate text-sm font-bold">{conversation.item}</h2>
          <p className="truncate text-xs text-muted-foreground">
            {conversation.dates} · {conversation.total}
          </p>
        </div>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => setExpanded((value) => !value)}
          aria-label="Toggle booking details"
        >
          <ChevronRight className={cn("transition-transform", expanded && "rotate-90")} />
        </Button>
      </div>
      {expanded && (
        <div className="mx-auto mt-3 grid max-w-4xl gap-2 border-t border-border pt-3 text-xs text-muted-foreground sm:grid-cols-3">
          <span className="flex items-center gap-2">
            <CalendarDays className="size-4 text-primary" />
            {conversation.dates}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="size-4 text-primary" />
            {conversation.location}
          </span>
          <span className="flex items-center gap-2">
            <ImageIcon className="size-4 text-primary" />
            Pickup details shared in chat
          </span>
        </div>
      )}
    </div>
  );
}
