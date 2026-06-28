import { IconArrowRight } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export function ContactForm() {
  return (
    <section className='bg-surface-raised py-20 md:py-24 border-t border-border'>
      <div className='site-wrapper max-w-3xl'>
        <div className='relative border border-border bg-background p-8 md:p-12 rounded-sm'>
          <div className='absolute top-0 left-0 w-10 h-px bg-custom/40' />
          <div className='absolute top-0 left-0 w-px h-10 bg-custom/40' />

          <div className='mb-10 text-center'>
            <h2 className='font-serif text-[clamp(1.5rem,3vw,2rem)] font-light text-foreground leading-snug'>
              Send us a message
            </h2>
            <p className='mt-2 text-sm text-muted-foreground'>
              We&rsquo;ll get back within 24 business hours.
            </p>
          </div>

          <form className='space-y-6'>
            <div className='grid gap-6 md:grid-cols-2'>
              <div className='group space-y-2'>
                <Label
                  htmlFor='name'
                  className='text-[9px] font-medium tracking-[0.2em] text-foreground uppercase transition-colors group-focus-within:text-custom'
                >
                  Full Name *
                </Label>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  required
                  placeholder='Your full name'
                  className='rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none text-foreground placeholder:text-muted-foreground/60 font-light focus-visible:border-custom/50 focus-visible:ring-0'
                />
              </div>
              <div className='group space-y-2'>
                <Label
                  htmlFor='email'
                  className='text-[9px] font-medium tracking-[0.2em] text-foreground uppercase transition-colors group-focus-within:text-custom'
                >
                  Email Address *
                </Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  required
                  placeholder='your@email.com'
                  className='rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none text-foreground placeholder:text-muted-foreground/60 font-light focus-visible:border-custom/50 focus-visible:ring-0'
                />
              </div>
            </div>

            <div className='group space-y-2'>
              <Label
                htmlFor='phone'
                className='text-[9px] font-medium tracking-[0.2em] text-foreground uppercase transition-colors group-focus-within:text-custom'
              >
                Phone Number
              </Label>
              <Input
                id='phone'
                name='phone'
                type='tel'
                placeholder='+880 1X XXX XXXXXX'
                className='rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none text-foreground placeholder:text-muted-foreground/60 font-light focus-visible:border-custom/50 focus-visible:ring-0'
              />
            </div>

            <div className='group space-y-2'>
              <Label
                htmlFor='interest'
                className='text-[9px] font-medium tracking-[0.2em] text-foreground uppercase transition-colors group-focus-within:text-custom'
              >
                Project Interest
              </Label>
              <Select defaultValue='Residential Development'>
                <SelectTrigger
                  id='interest'
                  className='rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none text-foreground font-light focus:ring-0 focus:border-custom/50 [&>svg]:text-muted-foreground'
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  className='rounded-sm border border-border bg-background text-foreground shadow-lg'
                  sideOffset={4}
                >
                  <SelectItem value='Residential Development'>
                    Residential Development
                  </SelectItem>
                  <SelectItem value='Commercial Portfolio'>
                    Commercial Portfolio
                  </SelectItem>
                  <SelectItem value='Sustainable Landmarks'>
                    Sustainable Landmarks
                  </SelectItem>
                  <SelectItem value='Consultancy Services'>
                    Consultancy Services
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='group space-y-2'>
              <Label
                htmlFor='message'
                className='text-[9px] font-medium tracking-[0.2em] text-foreground uppercase transition-colors group-focus-within:text-custom'
              >
                Your Message
              </Label>
              <Textarea
                id='message'
                name='message'
                rows={4}
                placeholder='Describe your project or inquiry...'
                className='resize-none rounded-sm border border-border bg-transparent p-4 shadow-none text-foreground placeholder:text-muted-foreground/60 font-light focus-visible:border-custom/50 focus-visible:ring-0'
              />
            </div>

            <div className='group'>
              <Button
                variant='custom'
                type='submit'
                className='relative w-full overflow-hidden rounded-sm px-12 py-3.5 text-[11px] font-semibold tracking-[0.15em] uppercase'
              >
                <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
                <span className='relative z-10 inline-flex items-center justify-center gap-3'>
                  Send Message
                  <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
