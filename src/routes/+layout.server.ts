// the load that produces user/session — NOT the one that builds the form
export const load = async ({ locals, depends }) => {
  depends('app:session');
  return { user: locals.user };
};