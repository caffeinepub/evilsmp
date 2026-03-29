import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Rule {
    id: bigint;
    content: string;
    createdAt: Time;
}
export type Time = bigint;
export interface PlayerCount {
    max: bigint;
    updatedAt: Time;
    current: bigint;
}
export type Principal = Principal;
export interface Announcement {
    title: string;
    author: Principal;
    message: string;
    timestamp: Time;
}
export interface OwnerProfile {
    contact: string;
    name: string;
}
export interface Stats {
    visits: bigint;
    registeredPlayers: bigint;
    loggedInPlayers: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addRule(content: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAnnouncement(title: string, message: string): Promise<void>;
    deleteRule(id: bigint): Promise<void>;
    getAllAnnouncements(): Promise<Array<Announcement>>;
    getAllRules(): Promise<Array<Rule>>;
    getCallerUserRole(): Promise<UserRole>;
    getOwnerProfile(): Promise<OwnerProfile | null>;
    getPlayerCount(): Promise<PlayerCount>;
    getStats(): Promise<Stats>;
    isCallerAdmin(): Promise<boolean>;
    recordLogin(): Promise<void>;
    recordVisit(): Promise<void>;
    registerPlayer(): Promise<void>;
    updateOwnerProfile(profile: OwnerProfile): Promise<void>;
    updatePlayerCount(current: bigint, max: bigint): Promise<void>;
    updateRule(id: bigint, content: string): Promise<void>;
}
