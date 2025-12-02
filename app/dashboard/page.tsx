import { createServerClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from './logout-button'

export default async function DashboardPage() {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <h1 className="text-xl font-bold">AutoSaaS App</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                {profile?.full_name || session.user.email}
              </span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-2xl font-bold mb-4">Welcome to your dashboard!</h2>

          <div className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-4">
              <h3 className="font-semibold text-blue-900">🎉 Authentication is working!</h3>
              <p className="mt-2 text-sm text-blue-800">
                You're signed in as: <strong>{session.user.email}</strong>
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-4">
              <h3 className="font-semibold text-green-900">✅ What's working:</h3>
              <ul className="mt-2 space-y-1 text-sm text-green-800">
                <li>• Supabase authentication</li>
                <li>• Protected routes (this page)</li>
                <li>• User profile storage</li>
                <li>• Session management</li>
              </ul>
            </div>

            <div className="rounded-lg bg-purple-50 p-4">
              <h3 className="font-semibold text-purple-900">🚀 Next steps:</h3>
              <ul className="mt-2 space-y-1 text-sm text-purple-800">
                <li>• Build your features using AutoSaaS vibe coding</li>
                <li>• Add database tables for your app</li>
                <li>• Create custom pages and components</li>
                <li>• Deploy to production</li>
              </ul>
            </div>

            <div className="rounded-lg bg-gray-100 p-4">
              <h3 className="font-semibold text-gray-900">📊 Your profile:</h3>
              <dl className="mt-2 space-y-1 text-sm text-gray-700">
                <div>
                  <dt className="inline font-medium">ID: </dt>
                  <dd className="inline font-mono text-xs">{session.user.id}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">Email: </dt>
                  <dd className="inline">{session.user.email}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">Name: </dt>
                  <dd className="inline">{profile?.full_name || 'Not set'}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">Created: </dt>
                  <dd className="inline">
                    {new Date(session.user.created_at).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
