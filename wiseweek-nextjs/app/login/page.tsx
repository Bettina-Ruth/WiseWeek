import { Suspense } from "react";
import AuthCard from "@/components/auth/AuthCard";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <AuthCard />
    </Suspense>
  );
}
