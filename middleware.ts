//Without a defined matcher, this one line applies next-auth to entire project
export { default } from 'next-auth/middleware'

export const config = { matcher: ['/edit/:path*'] }
