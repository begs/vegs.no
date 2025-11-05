import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-lg">
          <div className="space-y-2">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-accent via-accent-purple to-accent-teal bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-foreground">
              Page Not Found
            </h2>
          </div>
          
          <p className="text-muted">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link 
            href="/"
            className="inline-block px-6 py-3 bg-accent text-background rounded-lg hover:bg-accent-purple transition-colors font-medium"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}