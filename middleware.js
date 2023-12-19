export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/profile',
    '/dashboard/agent',
    '/dashboard/agent/edit',
    '/dashboard/agent/new',
    '/dashboard/account',
    '/dashboard/account/instagram',
    '/dashboard/account/whatsapp',
    '/dashboard/account/messenger',
    '/dashboard/account/instagram/chat',
    '/dashboard/account/whatsapp/chat',
    '/dashboard/account/messenger/chat']
}
