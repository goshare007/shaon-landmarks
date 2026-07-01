import { createFileRoute } from '@tanstack/react-router';
import { Image } from '@unpic/react';

export const Route = createFileRoute('/')({ component: Home });

// Dummy data for log rows
const systemLogs = Array.from({ length: 25 }, (_, i) => ({
  id: `LOG-${2000 + i}`,
  service: ['auth-service', 'payment-gateway', 'cdn-edge', 'db-pool'][i % 4],
  status: ['SUCCESS', 'WARNING', 'ERROR'][i % 3],
  message: `Automated telemetry ping payload_${Math.random().toString(36).substring(7)}.`,
}));

// Dummy array for grid cards with unique random images
const featureCards = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  title: `Abstract Matrix Node 0${i + 1}`,
  description: `Decentralized validation telemetry for sync layer-${100 * (i + 1)}.`,
  imgUrl: `https://picsum.photos/seed/node${i}/600/400`,
}));

function Home() {
  return (
    <div className='min-h-screen bg-background text-foreground antialiased'>
      <main className='container mx-auto p-6 space-y-12 max-w-5xl'>
        {/* Hero Banner Section with Unpic Image */}
        <section className='relative overflow-hidden rounded-2xl border bg-card aspect-[21/9] flex items-center p-8'>
          <div className='absolute inset-0 z-0 opacity-40'>
            <Image
              src='https://picsum.photos/seed/herostart/1200/500'
              layout='fullWidth'
              alt='Hero background asset'
              fetchPriority='high'
              loading='eager'
              className='w-full h-full object-cover filter grayscale contrast-125'
            />
          </div>
          <div className='relative z-10 max-w-xl space-y-2 bg-background/80 p-6 rounded-lg backdrop-blur-sm border'>
            <h1 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
              Visual Core Loop
            </h1>
            <p className='text-sm text-muted-foreground'>
              Testing responsive asset optimization with multi-source responsive
              image layouts.
            </p>
          </div>
        </section>

        {/* Feature Grid Section with Unpic Placeholders */}
        <section className='space-y-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Render Arrays</h2>
            <p className='text-xs text-muted-foreground'>
              Visual breaks inserted to stack vertical viewport space.
            </p>
          </div>

          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {featureCards.map((card) => (
              <div
                key={card.id}
                className='group overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md'
              >
                <div className='aspect-[4/3] w-full bg-muted overflow-hidden relative'>
                  <Image
                    src={card.imgUrl}
                    layout='constrained'
                    width={600}
                    height={400}
                    alt={card.title}
                    className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
                <div className='p-4 space-y-1'>
                  <h3 className='font-semibold text-base'>{card.title}</h3>
                  <p className='text-xs text-muted-foreground leading-relaxed'>
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dense Table Section to push the viewport further down */}
        <section className='space-y-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Stream Log Vectors
            </h2>
            <p className='text-xs text-muted-foreground'>
              Tabular layout sequence stack.
            </p>
          </div>

          <div className='rounded-lg border bg-card overflow-hidden'>
            <table className='w-full text-sm text-left border-collapse'>
              <thead className='border-b bg-muted/60 font-medium text-muted-foreground text-xs uppercase tracking-wider'>
                <tr>
                  <th className='p-3 w-[100px]'>Node</th>
                  <th className='p-3 w-[100px]'>Status</th>
                  <th className='p-3'>Data Manifest payload</th>
                </tr>
              </thead>
              <tbody className='divide-y font-mono text-xs'>
                {systemLogs.map((log) => (
                  <tr key={log.id} className='hover:bg-muted/30'>
                    <td className='p-3 text-primary font-semibold'>{log.id}</td>
                    <td className='p-3'>
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded border text-[10px] ${
                          log.status === 'SUCCESS'
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                            : log.status === 'WARNING'
                              ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className='p-3 text-muted-foreground'>{log.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer Boundary Anchor */}
        <footer className='border-t pt-8 pb-12 flex justify-between text-[11px] text-muted-foreground font-mono'>
          <span>End of Flow Matrix</span>
          <span>Index Reference: 0x7FFF</span>
        </footer>
      </main>
    </div>
  );
}
