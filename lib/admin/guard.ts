/**
 * The admin editor writes to the project directory, so it must never be
 * reachable from the deployed site. It is enabled only when the server is
 * running in development — production builds have no admin at all.
 *
 * This is checked in the page, the layout and every API route, so no single
 * mistake can expose it.
 */
export const isAdminEnabled = process.env.NODE_ENV === "development";
