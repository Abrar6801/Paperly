export default {
  providers: [
    {
      // Set CLERK_JWT_ISSUER_DOMAIN in the Convex dashboard environment variables.
      // Dev:  https://<instance>.clerk.accounts.dev
      // Prod: https://<instance>.clerk.accounts.com
      // See: https://docs.convex.dev/auth/clerk#configuring-dev-and-prod-instances
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: "convex",
    },
  ],
};
