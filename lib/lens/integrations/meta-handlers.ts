import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import {
  buildMetaAuthUrl,
  encryptToken,
  exchangeCodeForToken,
  exchangeForLongLivedToken,
  META_SCOPES,
  signState,
  verifyState,
  type MetaProvider,
} from "@/lib/lens/integrations/meta-oauth";

const INTEGRATIONS_PATH = "/products/lens/integrations";

function baseUrl(request: NextRequest): string {
  const fromEnv = (process.env.NEXT_PUBLIC_APP_URL || "")
    .trim()
    .replace(/\/+$/, "");
  if (fromEnv) return fromEnv;
  return request.nextUrl.origin;
}

function redirectWithError(
  request: NextRequest,
  message: string
): NextResponse {
  return NextResponse.redirect(
    baseUrl(request) + INTEGRATIONS_PATH + "?error=" + encodeURIComponent(message)
  );
}

function stateCookieName(provider: MetaProvider): string {
  return "lens_meta_state_" + provider;
}

export function makeMetaConnectHandler(provider: MetaProvider) {
  return async function GET(request: NextRequest): Promise<NextResponse> {
    try {
      const clientId = request.nextUrl.searchParams.get("clientId");
      if (!clientId) {
        return redirectWithError(
          request,
          "Missing clientId in the connect link"
        );
      }
      const state = signState({
        clientId: clientId,
        provider: provider,
        nonce: crypto.randomBytes(16).toString("hex"),
        ts: Date.now(),
      });
      const response = NextResponse.redirect(
        buildMetaAuthUrl(provider, state)
      );
      response.cookies.set(stateCookieName(provider), state, {
        httpOnly: true,
        sameSite: "lax",
        secure: request.nextUrl.protocol === "https:",
        path: "/",
        maxAge: 600,
      });
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Connect failed";
      return redirectWithError(request, message);
    }
  };
}

export function makeMetaCallbackHandler(provider: MetaProvider) {
  return async function GET(request: NextRequest): Promise<NextResponse> {
    try {
      const params = request.nextUrl.searchParams;
      const oauthError = params.get("error_description") || params.get("error");
      if (oauthError) return redirectWithError(request, oauthError);

      const code = params.get("code");
      const state = params.get("state");
      if (!code || !state) {
        return redirectWithError(request, "Missing code or state");
      }

      const payload = verifyState(state, provider);
      if (!payload) return redirectWithError(request, "State mismatch");

      const cookieState = request.cookies.get(stateCookieName(provider));
      if (cookieState && cookieState.value !== state) {
        return redirectWithError(request, "State mismatch");
      }

      const shortLivedToken = await exchangeCodeForToken(provider, code);
      const longLivedToken = await exchangeForLongLivedToken(shortLivedToken);

      const supabase = await createServerSupabase();
      const { data: userData } = await supabase.auth.getUser();
      if (!userData || !userData.user) {
        return redirectWithError(request, "Please log in and try again");
      }

      await supabase
        .from("connections")
        .delete()
        .eq("client_id", payload.clientId)
        .eq("provider", provider);

      const { error: insertError } = await supabase
        .from("connections")
        .insert({
          client_id: payload.clientId,
          provider: provider,
          external_account_id: null,
          access_token_enc: encryptToken(longLivedToken),
          refresh_token_enc: null,
          scopes: META_SCOPES[provider],
          status: "active",
          last_synced_at: null,
        });
      if (insertError) return redirectWithError(request, insertError.message);

      const response = NextResponse.redirect(
        baseUrl(request) + INTEGRATIONS_PATH + "?connected=" + provider
      );
      response.cookies.delete(stateCookieName(provider));
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Connection failed";
      return redirectWithError(request, message);
    }
  };
}