import {
  BarChart3, CircleHelp, Compass, Heart, Home, LayoutDashboard, Leaf,
  List, MessageCircle, PlusCircle, Settings, Shield, Tags, Users, UserRound,
} from "lucide-react";

export const publicNavigation = [
  { label: "Find a Flex", to: "/explore", icon: Compass },
  { label: "How It Works", to: "/how-it-works", icon: CircleHelp },
  { label: "Flex an Item", to: "/add-listing", icon: PlusCircle },
] as const;

export const accountNavigation = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard },
  { label: "My listings", to: "/my-listings", icon: List },
  { label: "Add listing", to: "/add-listing", icon: PlusCircle },
  { label: "My Flexes", to: "/my-rentals", icon: Tags },
  { label: "Messages", to: "/messages", icon: MessageCircle },
  { label: "Saved items", to: "/saved-items", icon: Heart },
  { label: "Impact", to: "/impact-dashboard", icon: Leaf },
  { label: "Profile", to: "/profile", icon: UserRound },
  { label: "Settings", to: "/settings", icon: Settings },
] as const;

export const adminNavigation = [
  { label: "Admin overview", to: "/admin", icon: Shield },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Listings", to: "/admin/listings", icon: List },
  { label: "Reports", to: "/admin/reports", icon: BarChart3 },
] as const;

export const mobileNavigation = [
  { label: "Home", to: "/", icon: Home },
  { label: "Find", to: "/explore", icon: Compass },
  { label: "Flex", to: "/add-listing", icon: PlusCircle },
  { label: "Messages", to: "/messages", icon: MessageCircle },
  { label: "Profile", to: "/profile", icon: UserRound },
] as const;
