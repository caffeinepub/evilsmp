import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Array "mo:core/Array";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Set "mo:core/Set";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the authorization system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Types
  type OwnerProfile = {
    name : Text;
    contact : Text;
  };

  type Rule = {
    id : Nat;
    content : Text;
    createdAt : Time.Time;
  };

  type Announcement = {
    title : Text;
    message : Text;
    author : Principal.Principal;
    timestamp : Time.Time;
  };

  type PlayerCount = {
    current : Nat;
    max : Nat;
    updatedAt : Time.Time;
  };

  type Stats = {
    visits : Nat;
    registeredPlayers : Nat;
    loggedInPlayers : Nat;
  };

  module Rule {
    public func compare(rule1 : Rule, rule2 : Rule) : Order.Order {
      Nat.compare(rule1.id, rule2.id);
    };
  };

  module Announcement {
    public func compare(announcement1 : Announcement, announcement2 : Announcement) : Order.Order {
      Int.compare(announcement2.timestamp, announcement1.timestamp);
    };
  };

  // State
  var ownerProfile : ?OwnerProfile = ?{
    name = "Anik";
    contact = "anik@example.com";
  };

  var nextRuleId = 1;
  let rules = Map.empty<Nat, Rule>();
  var announcements = List.empty<Announcement>();
  var playerCount : PlayerCount = {
    current = 0;
    max = 100;
    updatedAt = Time.now();
  };

  // Analytics state
  var visitCount : Nat = 0;
  let registeredPlayers = Set.empty<Principal.Principal>();
  let loggedInPlayers = Set.empty<Principal.Principal>();

  // Record a page visit (anyone)
  public func recordVisit() : async () {
    visitCount += 1;
  };

  // Record a login (authenticated users)
  public shared ({ caller }) func recordLogin() : async () {
    if (caller.isAnonymous()) return;
    loggedInPlayers.add(caller);
  };

  // Register a player (authenticated users)
  public shared ({ caller }) func registerPlayer() : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Must be logged in to register");
    };
    registeredPlayers.add(caller);
  };

  // Get stats - admin only
  public shared ({ caller }) func getStats() : async Stats {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admin can view stats");
    };
    {
      visits = visitCount;
      registeredPlayers = registeredPlayers.size();
      loggedInPlayers = loggedInPlayers.size();
    };
  };

  // Rule management - Owner only
  public shared ({ caller }) func addRule(content : Text) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only owner can add rules");
    };
    let rule : Rule = {
      id = nextRuleId;
      content;
      createdAt = Time.now();
    };
    rules.add(nextRuleId, rule);
    let ruleId = nextRuleId;
    nextRuleId += 1;
    ruleId;
  };

  public shared ({ caller }) func updateRule(id : Nat, content : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only owner can edit rules");
    };
    switch (rules.get(id)) {
      case (null) { Runtime.trap("Rule not found") };
      case (?existing) {
        let updated : Rule = {
          id = existing.id;
          content;
          createdAt = existing.createdAt;
        };
        rules.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func deleteRule(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only owner can delete rules");
    };
    if (not rules.containsKey(id)) {
      Runtime.trap("Rule not found");
    };
    rules.remove(id);
  };

  // Public query - anyone can view rules
  public query func getAllRules() : async [Rule] {
    rules.values().toArray().sort();
  };

  // Announcements - Owner and Moderators can post
  public shared ({ caller }) func createAnnouncement(title : Text, message : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only moderators and owner can post announcements");
    };
    let announcement : Announcement = {
      title;
      message;
      author = caller;
      timestamp = Time.now();
    };
    announcements.add(announcement);
  };

  // Public query - anyone can view announcements
  public query func getAllAnnouncements() : async [Announcement] {
    announcements.toArray().sort();
  };

  // Player Count - Owner and Moderators can update
  public shared ({ caller }) func updatePlayerCount(current : Nat, max : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only moderators and owner can update player count");
    };
    playerCount := {
      current;
      max;
      updatedAt = Time.now();
    };
  };

  // Public query - anyone can view player count
  public query func getPlayerCount() : async PlayerCount {
    playerCount;
  };

  // Owner Profile - anyone can view
  public query func getOwnerProfile() : async ?OwnerProfile {
    ownerProfile;
  };

  // Owner Profile - only owner can update
  public shared ({ caller }) func updateOwnerProfile(profile : OwnerProfile) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only owner can update profile");
    };
    ownerProfile := ?profile;
  };
};
