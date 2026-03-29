import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { OwnerProfile } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllRules() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["rules"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRules();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllAnnouncements() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAnnouncements();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPlayerCount() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["playerCount"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPlayerCount();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}

export function useGetOwnerProfile() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["ownerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getOwnerProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddRule() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => {
      if (!actor) throw new Error("No actor");
      return actor.addRule(content);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["rules"] }),
  });
}

export function useUpdateRule() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, content }: { id: bigint; content: string }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateRule(id, content);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["rules"] }),
  });
}

export function useDeleteRule() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteRule(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["rules"] }),
  });
}

export function useCreateAnnouncement() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ title, message }: { title: string; message: string }) => {
      if (!actor) throw new Error("No actor");
      return actor.createAnnouncement(title, message);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}

export function useUpdatePlayerCount() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ current, max }: { current: bigint; max: bigint }) => {
      if (!actor) throw new Error("No actor");
      return actor.updatePlayerCount(current, max);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["playerCount"] }),
  });
}

export function useUpdateOwnerProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (profile: OwnerProfile) => {
      if (!actor) throw new Error("No actor");
      return actor.updateOwnerProfile(profile);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ownerProfile"] }),
  });
}
