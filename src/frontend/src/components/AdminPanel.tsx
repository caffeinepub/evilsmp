import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Loader2, Pencil, Shield, Trash2, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useAddRule,
  useCreateAnnouncement,
  useDeleteRule,
  useGetAllAnnouncements,
  useGetAllRules,
  useGetOwnerProfile,
  useGetPlayerCount,
  useGetStats,
  useUpdateOwnerProfile,
  useUpdatePlayerCount,
  useUpdateRule,
} from "../hooks/useQueries";

export default function AdminPanel({ autoOpen }: { autoOpen?: boolean } = {}) {
  const [open, setOpen] = useState(autoOpen ?? false);

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-accent/20 border border-accent/60 text-accent hover:bg-accent/30 font-pixel text-xs glow-purple px-8 py-6"
                data-ocid="admin.open_modal_button"
              >
                <Shield size={16} className="mr-2" />
                ADMIN PANEL
              </Button>
            </DialogTrigger>
            <DialogContent
              className="bg-card border border-glow-purple max-w-2xl max-h-[85vh] overflow-y-auto"
              data-ocid="admin.dialog"
            >
              <DialogHeader>
                <DialogTitle className="font-pixel text-accent text-glow-purple">
                  ⚙ ADMIN PANEL
                </DialogTitle>
              </DialogHeader>
              <AdminTabs />
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
}

function AdminTabs() {
  return (
    <Tabs defaultValue="rules">
      <TabsList className="grid grid-cols-5 bg-muted">
        <TabsTrigger
          value="rules"
          className="font-pixel text-xs"
          data-ocid="admin.rules.tab"
        >
          Rules
        </TabsTrigger>
        <TabsTrigger
          value="announcements"
          className="font-pixel text-xs"
          data-ocid="admin.announcements.tab"
        >
          News
        </TabsTrigger>
        <TabsTrigger
          value="players"
          className="font-pixel text-xs"
          data-ocid="admin.players.tab"
        >
          Players
        </TabsTrigger>
        <TabsTrigger
          value="owner"
          className="font-pixel text-xs"
          data-ocid="admin.owner.tab"
        >
          Owner
        </TabsTrigger>
        <TabsTrigger
          value="stats"
          className="font-pixel text-xs"
          data-ocid="admin.stats.tab"
        >
          Stats
        </TabsTrigger>
      </TabsList>
      <TabsContent value="rules">
        <RulesTab />
      </TabsContent>
      <TabsContent value="announcements">
        <AnnouncementsTab />
      </TabsContent>
      <TabsContent value="players">
        <PlayersTab />
      </TabsContent>
      <TabsContent value="owner">
        <OwnerTab />
      </TabsContent>
      <TabsContent value="stats">
        <StatsTab />
      </TabsContent>
    </Tabs>
  );
}

function StatsTab() {
  const { data: stats, isLoading } = useGetStats();

  const statCards = [
    {
      label: "TOTAL VISITS",
      value: stats?.visits,
      icon: <Eye size={20} className="text-primary" />,
      color: "border-primary/30 bg-primary/5",
    },
    {
      label: "REGISTERED PLAYERS",
      value: stats?.registeredPlayers,
      icon: <Users size={20} className="text-accent" />,
      color: "border-accent/30 bg-accent/5",
    },
    {
      label: "PLAYERS LOGGED IN",
      value: stats?.loggedInPlayers,
      icon: <Shield size={20} className="text-red-400" />,
      color: "border-red-400/30 bg-red-400/5",
    },
  ];

  return (
    <div className="py-4 space-y-4" data-ocid="admin.stats.panel">
      <Label className="font-pixel text-xs text-muted-foreground">
        SERVER ANALYTICS
      </Label>
      <div className="grid grid-cols-1 gap-3">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`flex items-center gap-4 p-4 rounded border ${card.color}`}
          >
            <div className="shrink-0">{card.icon}</div>
            <div className="flex-1">
              <p className="font-pixel text-xs text-muted-foreground">
                {card.label}
              </p>
              {isLoading || card.value === undefined ? (
                <Skeleton
                  className="h-7 w-16 mt-1"
                  data-ocid="admin.stats.loading_state"
                />
              ) : (
                <p className="text-2xl font-bold text-foreground mt-0.5">
                  {card.value.toString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center pt-1">
        Auto-refreshes every 10 seconds
      </p>
    </div>
  );
}

type EditState = { id: bigint; content: string };

function RulesTab() {
  const { data: rules } = useGetAllRules();
  const addRule = useAddRule();
  const updateRule = useUpdateRule();
  const deleteRule = useDeleteRule();
  const [newRule, setNewRule] = useState("");
  const [editing, setEditing] = useState<EditState | null>(null);

  const handleAdd = async () => {
    if (!newRule.trim()) return;
    await addRule.mutateAsync(newRule.trim());
    setNewRule("");
    toast.success("Rule added!");
  };

  const handleUpdate = async () => {
    if (!editing) return;
    await updateRule.mutateAsync({ id: editing.id, content: editing.content });
    setEditing(null);
    toast.success("Rule updated!");
  };

  const handleDelete = async (id: bigint) => {
    await deleteRule.mutateAsync(id);
    toast.success("Rule deleted.");
  };

  const setEditContent = (content: string) => {
    setEditing((prev) => (prev ? { ...prev, content } : null));
  };

  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label className="font-pixel text-xs text-muted-foreground">
          ADD NEW RULE
        </Label>
        <div className="flex gap-2">
          <Input
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            placeholder="Enter rule..."
            className="bg-muted border-border text-foreground"
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            data-ocid="admin.rules.input"
          />
          <Button
            onClick={handleAdd}
            disabled={addRule.isPending}
            className="bg-primary/20 border border-primary/60 text-primary hover:bg-primary/30"
            data-ocid="admin.rules.submit_button"
          >
            {addRule.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Add"
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {rules?.map((rule, i) => (
          <div
            key={rule.id.toString()}
            className="flex items-center gap-2 p-2 bg-muted/50 rounded border border-border"
            data-ocid={`admin.rules.item.${i + 1}`}
          >
            {editing?.id === rule.id ? (
              <>
                <Input
                  value={editing.content}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="flex-1 bg-background border-border text-foreground h-8 text-xs"
                />
                <Button
                  size="sm"
                  onClick={handleUpdate}
                  disabled={updateRule.isPending}
                  className="text-xs bg-primary/20 text-primary border border-primary/60 h-8"
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditing(null)}
                  className="text-xs h-8"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <span className="flex-1 text-xs text-foreground">
                  {rule.content}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() =>
                    setEditing({ id: rule.id, content: rule.content })
                  }
                  className="h-7 w-7 text-accent hover:bg-accent/10"
                  data-ocid={`admin.rules.edit_button.${i + 1}`}
                >
                  <Pencil size={12} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(rule.id)}
                  disabled={deleteRule.isPending}
                  className="h-7 w-7 text-destructive hover:bg-destructive/10"
                  data-ocid={`admin.rules.delete_button.${i + 1}`}
                >
                  <Trash2 size={12} />
                </Button>
              </>
            )}
          </div>
        ))}
        {(!rules || rules.length === 0) && (
          <p
            className="text-xs text-muted-foreground text-center py-4"
            data-ocid="admin.rules.empty_state"
          >
            No rules saved yet. Add from above.
          </p>
        )}
      </div>
    </div>
  );
}

function AnnouncementsTab() {
  const createAnnouncement = useCreateAnnouncement();
  const { data: announcements } = useGetAllAnnouncements();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!title.trim() || !message.trim()) return;
    await createAnnouncement.mutateAsync({
      title: title.trim(),
      message: message.trim(),
    });
    setTitle("");
    setMessage("");
    toast.success("Announcement posted!");
  };

  return (
    <div className="space-y-4 py-2">
      <div className="space-y-3">
        <div>
          <Label className="font-pixel text-xs text-muted-foreground">
            TITLE
          </Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Announcement title..."
            className="bg-muted border-border text-foreground mt-1"
            data-ocid="admin.announcements.input"
          />
        </div>
        <div>
          <Label className="font-pixel text-xs text-muted-foreground">
            MESSAGE
          </Label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your announcement..."
            className="bg-muted border-border text-foreground mt-1 min-h-24"
            data-ocid="admin.announcements.textarea"
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={
            createAnnouncement.isPending || !title.trim() || !message.trim()
          }
          className="w-full bg-accent/20 border border-accent/60 text-accent hover:bg-accent/30 font-pixel text-xs"
          data-ocid="admin.announcements.submit_button"
        >
          {createAnnouncement.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          POST ANNOUNCEMENT
        </Button>
      </div>

      {announcements && announcements.length > 0 && (
        <div className="space-y-2">
          <Label className="font-pixel text-xs text-muted-foreground">
            RECENT
          </Label>
          {announcements.slice(0, 3).map((ann) => (
            <div
              key={ann.title + ann.timestamp.toString()}
              className="p-2 bg-muted/50 rounded border border-border"
            >
              <p className="text-xs font-semibold text-accent">{ann.title}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {ann.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PlayersTab() {
  const { data: playerCount } = useGetPlayerCount();
  const updatePlayerCount = useUpdatePlayerCount();
  const [current, setCurrent] = useState("");
  const [max, setMax] = useState("");

  const handleUpdate = async () => {
    const c = Number.parseInt(current);
    const m = Number.parseInt(max);
    if (Number.isNaN(c) || Number.isNaN(m)) return;
    await updatePlayerCount.mutateAsync({ current: BigInt(c), max: BigInt(m) });
    toast.success("Player count updated!");
  };

  return (
    <div className="space-y-4 py-2">
      {playerCount && (
        <div className="flex gap-2">
          <Badge className="bg-primary/20 text-primary border-primary/40 font-pixel text-xs">
            Current: {playerCount.current.toString()}
          </Badge>
          <Badge className="bg-muted text-muted-foreground border-border font-pixel text-xs">
            Max: {playerCount.max.toString()}
          </Badge>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="font-pixel text-xs text-muted-foreground">
            CURRENT
          </Label>
          <Input
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            type="number"
            min="0"
            placeholder={playerCount?.current.toString() || "0"}
            className="bg-muted border-border text-foreground mt-1"
            data-ocid="admin.players.current.input"
          />
        </div>
        <div>
          <Label className="font-pixel text-xs text-muted-foreground">
            MAX
          </Label>
          <Input
            value={max}
            onChange={(e) => setMax(e.target.value)}
            type="number"
            min="1"
            placeholder={playerCount?.max.toString() || "20"}
            className="bg-muted border-border text-foreground mt-1"
            data-ocid="admin.players.max.input"
          />
        </div>
      </div>
      <Button
        onClick={handleUpdate}
        disabled={updatePlayerCount.isPending || !current || !max}
        className="w-full bg-primary/20 border border-primary/60 text-primary hover:bg-primary/30 font-pixel text-xs"
        data-ocid="admin.players.submit_button"
      >
        {updatePlayerCount.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : null}
        UPDATE
      </Button>
    </div>
  );
}

function OwnerTab() {
  const { data: ownerProfile } = useGetOwnerProfile();
  const updateOwnerProfile = useUpdateOwnerProfile();
  const [name, setName] = useState(ownerProfile?.name || "Anik");
  const [contact, setContact] = useState(ownerProfile?.contact || "");

  const handleUpdate = async () => {
    await updateOwnerProfile.mutateAsync({
      name: name.trim(),
      contact: contact.trim(),
    });
    toast.success("Owner profile updated!");
  };

  return (
    <div className="space-y-4 py-2">
      <div>
        <Label className="font-pixel text-xs text-muted-foreground">
          OWNER NAME
        </Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name..."
          className="bg-muted border-border text-foreground mt-1"
          data-ocid="admin.owner.name.input"
        />
      </div>
      <div>
        <Label className="font-pixel text-xs text-muted-foreground">
          CONTACT / DISCORD
        </Label>
        <Input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Discord: @username / email..."
          className="bg-muted border-border text-foreground mt-1"
          data-ocid="admin.owner.contact.input"
        />
      </div>
      <Button
        onClick={handleUpdate}
        disabled={updateOwnerProfile.isPending || !name.trim()}
        className="w-full bg-accent/20 border border-accent/60 text-accent hover:bg-accent/30 font-pixel text-xs"
        data-ocid="admin.owner.submit_button"
      >
        {updateOwnerProfile.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : null}
        SAVE PROFILE
      </Button>
    </div>
  );
}
